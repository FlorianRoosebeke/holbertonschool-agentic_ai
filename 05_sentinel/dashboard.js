const issues = [
  {
    number: 350147,
    title: "not a single global MCP Server is working with the copilot harness by default",
    state: "open",
    createdAt: "2026-11-24T14:15:30Z",
    url: "https://github.com/microsoft/vscode/issues/350147",
    category: "MCP",
    summary:
      "Le serveur MCP Context7 échoue dans le harness Copilot à cause des règles réseau du sandbox. L’auteur indique avoir résolu son cas, mais demande que l’erreur soit exposée et qu’une correction soit suggérée.",
  },
  {
    number: 350142,
    title: "vs code 1.147 failed to connect to docker",
    state: "open",
    createdAt: "2026-11-24T13:44:44Z",
    url: "https://github.com/microsoft/vscode/issues/350142",
    category: "Docker",
    summary:
      "Échec de connexion à Docker dans VS Code 1.147 sur une machine Windows isolée d’un réseau fermé. Un journal est joint au signalement.",
  },
  {
    number: 350135,
    title:
      "Agent sandbox on Windows breaks stdio MCP servers using Volta-managed npx, and Chrome launched by Playwright MCP self-terminates (crashpad)",
    state: "open",
    createdAt: "2026-11-24T12:36:55Z",
    url: "https://github.com/microsoft/vscode/issues/350135",
    category: "Sandbox",
    summary:
      "Sous Windows, le sandbox empêche Volta de résoudre npx et Chrome lancé par Playwright MCP s’arrête avec une erreur liée à Crashpad.",
  },
  {
    number: 350131,
    title: "Chat attachment picker does not distinguish selections from the same file",
    state: "open",
    createdAt: "2026-11-24T12:11:58Z",
    url: "https://github.com/microsoft/vscode/issues/350131",
    category: "Chat",
    summary:
      "Deux sélections issues du même fichier sont affichées sous le même nom dans le chat. La demande : montrer les plages de lignes pour les distinguer.",
  },
  {
    number: 350129,
    title: "Show chat editing Keep/Undo overlay and change navigation in custom text editors",
    state: "open",
    createdAt: "2026-11-24T12:06:39Z",
    url: "https://github.com/microsoft/vscode/issues/350129",
    category: "Éditeur",
    summary:
      "Les éditeurs de texte personnalisés n’affichent pas les actions Keep/Undo des modifications de chat ni la navigation entre changements.",
  },
];

const issueList = document.querySelector("#issue-list");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const resultsCount = document.querySelector("#results-count");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let activeFilter = "all";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createIssueRow(issue) {
  const row = document.createElement("article");
  row.className = "issue-row";

  const main = document.createElement("div");
  main.className = "issue-main";

  const titleLine = document.createElement("div");
  titleLine.className = "issue-title-line";

  const status = createTextElement(
    "span",
    `issue-status${issue.state === "closed" ? " issue-status-closed" : ""}`,
    "●",
  );
  status.setAttribute(
    "aria-label",
    issue.state === "closed" ? "Issue fermée" : "Issue ouverte",
  );
  titleLine.append(status);

  const title = document.createElement("a");
  title.className = "issue-title";
  title.href = issue.url;
  title.target = "_blank";
  title.rel = "noopener noreferrer";
  title.textContent = issue.title;
  titleLine.append(title);
  main.append(titleLine);

  const meta = document.createElement("div");
  meta.className = "issue-meta";
  meta.append(
    createTextElement("span", "", `#${issue.number}`),
    createTextElement("span", "meta-separator", "·"),
    createTextElement(
      "time",
      "",
      dateFormatter.format(new Date(issue.createdAt)),
    ),
  );
  meta.lastElementChild.dateTime = issue.createdAt;
  main.append(meta);
  main.append(createTextElement("p", "issue-summary", issue.summary));

  const tags = document.createElement("div");
  tags.className = "issue-tags";
  tags.append(createTextElement("span", "issue-tag", issue.category));

  row.append(main, tags);
  return row;
}

function updateCounts() {
  const openCount = issues.filter((issue) => issue.state === "open").length;
  const closedCount = issues.filter((issue) => issue.state === "closed").length;
  const latestIssue = issues.reduce((latest, issue) =>
    new Date(issue.createdAt) > new Date(latest.createdAt) ? issue : latest,
  );
  const latestDateParts = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).formatToParts(new Date(latestIssue.createdAt));
  document.querySelector("#latest-day").textContent = latestDateParts.find(
    (part) => part.type === "day",
  ).value;
  document.querySelector("#latest-month").textContent = latestDateParts.find(
    (part) => part.type === "month",
  ).value;
  document.querySelector("#total-count").textContent = String(issues.length);
  document.querySelector("#open-count").textContent = String(openCount);
  document.querySelector("#closed-count").textContent = String(closedCount);
  document.querySelector("#sidebar-count").textContent = String(issues.length);
  document.querySelector("#all-filter-count").textContent = String(issues.length);
  document.querySelector("#open-filter-count").textContent = String(openCount);
  document.querySelector("#closed-filter-count").textContent = String(closedCount);
}

function renderIssues() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const filteredIssues = issues
    .filter((issue) => activeFilter === "all" || issue.state === activeFilter)
    .filter((issue) => {
      const searchableText =
        `${issue.number} ${issue.title} ${issue.summary} ${issue.category}`.toLocaleLowerCase(
          "fr",
        );
      return searchableText.includes(query);
    })
    .sort((first, second) => {
      if (sortSelect.value === "number") return second.number - first.number;
      const dateDifference =
        new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();
      return sortSelect.value === "oldest" ? dateDifference : -dateDifference;
    });

  issueList.replaceChildren();
  if (filteredIssues.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.append(
      createTextElement("strong", "", "Aucune issue trouvée"),
      createTextElement("span", "", "Modifiez votre recherche ou votre filtre."),
    );
    issueList.append(emptyState);
  } else {
    issueList.append(...filteredIssues.map(createIssueRow));
  }

  resultsCount.textContent = `${filteredIssues.length} résultat${
    filteredIssues.length === 1 ? "" : "s"
  } sur ${issues.length}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    renderIssues();
  });
});

searchInput.addEventListener("input", renderIssues);
sortSelect.addEventListener("change", renderIssues);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
  }
});

updateCounts();
renderIssues();
