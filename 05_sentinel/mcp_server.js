import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "github-issues-server", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

const ISSUE_LIMIT = 5;
const PAGE_SIZE = 100;

async function fetchLatestIssues(owner, repo) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is required to call the GitHub API.");
  }

  if (!owner.trim() || !repo.trim()) {
    throw new Error("Both owner and repo must be non-empty strings.");
  }

  const issues = [];
  let page = 1;

  while (issues.length < ISSUE_LIMIT) {
    const url = new URL(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
    );
    url.search = new URLSearchParams({
      direction: "desc",
      page: String(page),
      per_page: String(PAGE_SIZE),
      sort: "created",
      state: "all",
    });

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      const responseBody = await response.text();
      let detail = responseBody;

      try {
        const parsedBody = JSON.parse(responseBody);
        if (typeof parsedBody.message === "string") {
          detail = parsedBody.message;
        }
      } catch {
        // Keep a non-JSON response body as the error detail.
      }

      const status = `${response.status}${response.statusText ? ` ${response.statusText}` : ""}`;
      throw new Error(
        `GitHub API error (${status})${detail ? `: ${detail}` : "."}`,
      );
    }

    const pageIssues = await response.json();
    if (!Array.isArray(pageIssues)) {
      throw new Error("GitHub API returned an unexpected response.");
    }

    issues.push(
      ...pageIssues
        .filter((issue) => !issue.pull_request)
        .map((issue) => ({
          number: issue.number,
          title: issue.title,
          state: issue.state,
          created_at: issue.created_at,
          html_url: issue.html_url,
          body: issue.body,
        })),
    );

    if (pageIssues.length < PAGE_SIZE) {
      break;
    }
    page += 1;
  }

  return issues.slice(0, ISSUE_LIMIT);
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "fetch_github_issues",
      description:
        "Fetches the five most recently created issues from a GitHub repository.",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string", description: "GitHub repository owner." },
          repo: { type: "string", description: "GitHub repository name." },
        },
        required: ["owner", "repo"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "fetch_github_issues") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const { owner, repo } = request.params.arguments;
  if (typeof owner !== "string" || typeof repo !== "string") {
    return {
      content: [{ type: "text", text: "owner and repo must be strings." }],
      isError: true,
    };
  }

  try {
    const issues = await fetchLatestIssues(owner, repo);
    return {
      content: [{ type: "text", text: JSON.stringify(issues, null, 2) }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Unable to fetch GitHub issues: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("GitHub Issues MCP server listening on stdio");
