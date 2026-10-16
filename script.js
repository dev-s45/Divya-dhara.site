
/* =========================================
   DIVYA DHARA — INTERACTIONS
========================================= */

"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* Safe local storage helpers */
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Browser storage uplabdh nahi hai.");
  }
}

/* Toast notifications */
let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* Copy text with a fallback for older browsers */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();

      const copied = document.execCommand("copy");
      area.remove();

      if (!copied) throw new Error("Copy failed");
    }

    showToast("Sandesh copy ho gaya 🙏");
    return true;
  } catch {
    showToast("Copy nahi hua. Text ko manually select karein.");
    return false;
  }
}

/* Footer year */
$("#currentYear").textContent = new Date().getFullYear();

/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = $("#menuToggle");
const mobileNav = $("#mobileNav");

function closeMobileMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileNav.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");
    $("#searchPanel").hidden = true;
  }
});

$$("a", mobileNav).forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeSearch();
    closeArticle();
  }
});

/* =========================================
   SEARCH PANEL
========================================= */

const searchToggle = $("#searchToggle");
const searchPanel = $("#searchPanel");
const searchInput = $("#searchInput");
const searchHint = $("#searchHint");
const clearSearch = $("#clearSearch");

function closeSearch() {
  searchPanel.hidden = true;
  searchToggle.setAttribute("aria-expanded", "false");
}

searchToggle.setAttribute("aria-expanded", "false");

searchToggle.addEventListener("click", () => {
  const opening = searchPanel.hidden;

  searchPanel.hidden = !opening;
  searchToggle.setAttribute("aria-expanded", String(opening));

  if (opening) {
    closeMobileMenu();
    searchInput.focus();
  } else {
    searchInput.value = "";
    applyFilters();
  }
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  applyFilters();
});

searchInput.addEventListener("input", applyFilters);

/* =========================================
   ARTICLE FILTERS + SEARCH
========================================= */

const articleCards = $$(".article-card");
const filterButtons = $$(".filter-chip");
const articleCount = $("#articleCount");
const emptyState = $("#emptyState");
const articleGrid = $("#articleGrid");

let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLocaleLowerCase("hi");
  let visibleCount = 0;

  articleCards.forEach(card => {
    const category = card.dataset.category || "";
    const title = card.dataset.title || "";
    const content = card.textContent || "";

    const matchesCategory =
      activeFilter === "all" || category === activeFilter;

    const searchableText = `${title} ${content}`.toLocaleLowerCase("hi");
    const matchesSearch = !query || searchableText.includes(query);

    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  articleCount.textContent = `${visibleCount} rachnayein`;
  emptyState.hidden = visibleCount !== 0;
  articleGrid.hidden = visibleCount === 0;

  if (query) {
    searchHint.textContent = visibleCount
      ? `${visibleCount} rachnayein mili hain.`
      : "Koi result nahi mila. Dusra shabd try karein.";
  } else {
    searchHint.textContent = "Apne manpasand vishay ko khojein.";
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    applyFilters();
  });
});

$("#resetFilters").addEventListener("click", () => {
  activeFilter = "all";
  searchInput.value = "";

  filterButtons.forEach(button => {
    const selected = button.dataset.filter === "all";
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  applyFilters();
});

/* =========================================
   FAVOURITES
========================================= */

let favourites = readStorage("divya-dhara-favourites", []);

function saveFavourites() {
  writeStorage("divya-dhara-favourites", favourites);
}

function isFavourite(id) {
  return favourites.includes(id);
}

function toggleFavourite(id) {
  if (isFavourite(id)) {
    favourites = favourites.filter(item => item !== id);
    showToast("Favourites se hata diya.");
  } else {
    favourites.push(id);
    showToast("Aapke favourites mein save ho gaya 🙏");
  }

  saveFavourites();
  updateFavouriteButtons();
}

function updateFavouriteButtons() {
  $$("[data-favorite]").forEach(button => {
    const id = button.dataset.favorite;
    const saved = isFavourite(id);

    button.classList.toggle("is-favorite", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute(
      "aria-label",
      `${saved ? "Remove" : "Save"} ${id} ${saved ? "from" : "to"} favourites`
    );
  });

  updateModalFavouriteButton();
}

$$("[data-favorite]").forEach(button => {
  button.addEventListener("click", () => {
    toggleFavourite(button.dataset.favorite);
  });
});

/* =========================================
   DAILY THOUGHT
========================================= */

const thoughts = [
  {
    title: "Apne karm par vishwas rakhiye, aur mann mein vishwas jagaye rakhiye.",
    description: "Har din ek nayi shuruaat hai. Nishtha se kiya gaya karm, dhairya aur saaf mann jeevan ki yatra ko arth dete hain."
  },
  {
    title: "Jahan mann mein daya hai, wahin sachchi bhakti ka prakash hai.",
    description: "Chhote se chhota daya bhara vyavahar bhi kisi ke din ko behtar bana sakta hai. Apne karm mein karuna ko jagah dein."
  },
  {
    title: "Shanti bahar ki paristhitiyon se nahi, apni drishti se bhi aati hai.",
    description: "Har baat ko dhairya se samajhne ka prayas karein. Kabhi-kabhi ruk kar sochna bhi aage badhne ka ek sahi kadam hota hai."
  },
  {
    title: "Shraddha ke saath prayas karein, aur har anubhav se seekhein.",
    description: "Jeevan mein har din kuch naya samajhne ka avsar hai. Vinamrata aur lagan se apni yatra jaari rakhein."
  },
  {
    title: "Kritagyata se bhara mann, chhoti khushiyon ko bhi pehchanta hai.",
    description: "Apne jeevan ki achhi baaton ko yaad karein. Aabhar ki bhavna rozmarra ke palon mein bhi sundarta dikhati hai."
  },
  {
    title: "Sahi disha mein uthaya gaya chhota kadam bhi mahatvapurn hai.",
    description: "Har badlav ek hi din mein nahi aata. Dhairya rakhein, apne prayason ko mahatva dein aur lagatar aage badhein."
  },
  {
    title: "Vinamrata gyaan ko sundarta deti hai, aur seva bhakti ko.",
    description: "Seekhte rehna aur apni samajh ko achhe karm mein badalna jeevan ko aur adhik arthpurn bana sakta hai."
  }
];

const thoughtTitle = $(".thought-copy h2");
const thoughtDescription = $(".thought-description");
const thoughtFeedback = $("#thoughtFeedback");
const newThoughtButton = $("#newThought");
const copyThoughtButton = $("#copyThought");

let thoughtIndex = 0;

function renderThought(index) {
  const thought = thoughts[index];

  thoughtTitle.textContent = thought.title;
  thoughtDescription.textContent = thought.description;
  thoughtFeedback.textContent = "";
}

newThoughtButton.addEventListener("click", () => {
  thoughtIndex = (thoughtIndex + 1) % thoughts.length;
  renderThought(thoughtIndex);
  thoughtFeedback.textContent = "Aaj ke liye ek nayi prerna. 🙏";
});

copyThoughtButton.addEventListener("click", () => {
  const thought = thoughts[thoughtIndex];

  copyText(`${thought.title}\n\n${thought.description}\n\n— Divya Dhara`);
});

/* =========================================
   ARTICLE READING MODAL
========================================= */

const articleData = {
  "gita-karm": {
    category: "BHAGAVAD GITA",
    duration: "5 MIN READ",
    title: "Bhagavad Gita ka Karm Yog: apna kartavya samjhein",
    intro: "Karm Yog humein apne kartavya ko samajhne, imaandari se prayas karne aur apni soch ko santulit rakhne ki prerna deta hai.",
    symbol: "गीता",
    paragraphs: [
      {
        heading: "Karm ka mahatva",
        text: "Bhagavad Gita mein karm aur kartavya par vishesh zor diya gaya hai. Jeevan mein hum kai tarah ki paristhitiyon ka saamna karte hain. Aise mein apni zimmedari ko samajhna aur sahi prayas karna mahatvapurn hai."
      },
      {
        heading: "Prayas par dhyan dein",
        text: "Karm Yog ka ek pramukh sandesh hai ki vyakti ko apne kartavya ke prati samarpit rehna chahiye. Har parinaam hamare poore niyantran mein nahi hota, lekin hum apni taiyari, niyat aur prayas ko behtar bana sakte hain."
      },
      {
        heading: "Jeevan mein kaise apnayein?",
        text: "Apna kaam imaandari se karein, faisle soch-samajhkar lein aur safalta ya asafalta se seekhne ka prayas karein. Apne kartavya ko mahatva dena aur parinaam ke prati santulit rehna, Karm Yog ko rozmarra ke jeevan se jodne ka ek tarika hai."
      }
    ]
  },

  "sachchi-bhakti": {
    category: "BHAKTI MARG",
    duration: "4 MIN READ",
    title: "Sachchi bhakti ka arth kya hai?",
    intro: "Bhakti shraddha, prem, vinamrata aur apne jeevan mein achhe moolyon ko jagah dene ka ek marg ho sakti hai.",
    symbol: "भक्ति",
    paragraphs: [
      {
        heading: "Bhavna ka mahatva",
        text: "Bhakti ko keval ek kriya tak seemit nahi samajhna chahiye. Pooja aur prarthana ke saath apne mann mein shraddha, karuna aur vinamrata ko jagah dena bhi bhakti ke anubhav ka hissa hai."
      },
      {
        heading: "Vyavahar mein bhakti",
        text: "Doosron se samman ke saath baat karna, zaruratmand ki madad karna aur apni galtiyon ko sweekar karna achhe jeevan-moolyon ko darshata hai. Aise karm hamari bhavnaon ko vyavahar se jodte hain."
      },
      {
        heading: "Apni yatra jaari rakhein",
        text: "Har vyakti ki bhakti ki yatra alag hoti hai. Apne vishwas ke anusaar prarthana karein, dharmik gyaan padhein aur jo seekhein use apne jeevan mein achhe tarike se apnane ka prayas karein."
      }
    ]
  },

  "dharma-kartavya": {
    category: "SANATAN GYAAN",
    duration: "4 MIN READ",
    title: "Dharma aur kartavya ka jeevan mein mahatva",
    intro: "Dharma aur kartavya par vichar karna humein apni zimmedariyon, vivek aur sahi aacharan ko samajhne mein madad kar sakta hai.",
    symbol: "धर्म",
    paragraphs: [
      {
        heading: "Dharma ko samajhna",
        text: "Bharatiya darshanik paramparaon mein dharma ka arth sandarbh ke anusaar vistar se samjha gaya hai. Ismein uchit aacharan, zimmedari aur jeevan ko sahi disha dene wale moolyon par vichar shamil ho sakta hai."
      },
      {
        heading: "Kartavya aur vivek",
        text: "Apne parivaar, samaj aur kaam ke prati zimmedari nibhate hue vivek ka istemal karna zaroori hai. Har paristhiti mein tathyon ko samajhna aur doosron ke prati samman banaye rakhna ek achha margdarshan ho sakta hai."
      },
      {
        heading: "Roz ke jeevan mein",
        text: "Apne vaadon ko nibhane, galti hone par use sudharne aur doosron ke adhikaron ka samman karne se kartavya ki bhavna vyavahar mein nazar aati hai."
      }
    ]
  },

  "prahlad": {
    category: "PAURANIK KATHA",
    duration: "6 MIN READ",
    title: "Bhakt Prahlad ki katha aur unki atal shraddha",
    intro: "Bhakt Prahlad ki prasiddh Puranik katha aastha, sahas aur apne vishwas par atal rehne ke vishay ko saamne rakhti hai.",
    symbol: "❋",
    paragraphs: [
      {
        heading: "Prahlad ki bhakti",
        text: "Puranik parampara ke anusaar, Prahlad Bhagwan Vishnu ke bhakt the. Unke pita Hiranyakashipu unki bhakti se sahmat nahi the. Phir bhi Prahlad apne vishwas aur Bhagwan ke prati apni shraddha par sthir rahe."
      },
      {
        heading: "Narasimha avatar ka prasang",
        text: "Katha mein bataya jata hai ki Bhagwan Vishnu ne apne bhakt ki raksha ke liye Narasimha avatar dharan kiya. Is prasang ko Holika Dahan aur Narasimha se judi dharmik paramparaon mein yaad kiya jata hai."
      },
      {
        heading: "Katha se milne wali seekh",
        text: "Prahlad ki katha ko aastha, sahas aur kathin paristhitiyon mein bhi apne moolyon par vichar karne ki prerna ke roop mein dekha jata hai. Alag-alag Puranik granthon mein is prasang ka varnan milta hai."
      }
    ]
  },

  "mann-shanti": {
    category: "BHAGAVAD GITA",
    duration: "4 MIN READ",
    title: "Bhagavad Gita ke anusar mann ki shanti",
    intro: "Apne vicharon ko samajhna, dhairya rakhna aur paristhitiyon par soch-samajhkar pratikriya dena mann ki shanti ki disha mein madadgar ho sakta hai.",
    symbol: "शान्ति",
    paragraphs: [
      {
        heading: "Apne vicharon ko pehchanein",
        text: "Kabhi-kabhi ek hi paristhiti par hum kai tarah se soch sakte hain. Apne vicharon ko thoda samay dekar samajhna humein jaldbaazi mein faisla lene se bacha sakta hai."
      },
      {
        heading: "Abhyas aur dhairya",
        text: "Gita mein abhyas aur mann ko sambhalne ke prayas par charcha milti hai. Roz kuch samay shaant baithna, prarthana karna ya apne din par vichar karna aapki vyaktigat routine ka hissa ban sakta hai."
      },
      {
        heading: "Santulit drishti",
        text: "Har paristhiti hamare anusaar nahi chalti. Jo baatein hamare niyantran mein hain, un par dhyan dena aur jinhe hum badal nahi sakte unhe samajhne ka prayas karna ek upyogi aadat hai."
      }
    ]
  },

  "daily-bhakti": {
    category: "BHAKTI",
    duration: "3 MIN READ",
    title: "Rozmarra ke jeevan mein bhakti kaise jodein?",
    intro: "Bhakti ko roz ke jeevan ka hissa banane ke liye aap apni aastha ke anusaar chhoti aur arthpurn aadatein apna sakte hain.",
    symbol: "दीप",
    paragraphs: [
      {
        heading: "Din ki shuruaat",
        text: "Aap chahein to subah kuch samay prarthana, mantra-jaap ya kisi dharmik granth ke chhote se ansh ko padhne ke liye nikaal sakte hain. Apni suvidha aur parampara ke anusaar routine banayein."
      },
      {
        heading: "Achhe karm ko jagah dein",
        text: "Parivaar ke logon ke prati samman, doosron ki madad aur apne kartavya ko imaandari se nibhana jeevan mein achhe moolyon ko apnane ke tarike hain."
      },
      {
        heading: "Kritagyata ka pal",
        text: "Din ke ant mein kuch pal nikaal kar un baaton ko yaad karein jinke liye aap aabhari hain. Isse aapko apne din ko shaant hokar dekhne ka avsar mil sakta hai."
      }
    ]
  }
};

const articleModal = $("#articleModal");
const modalClose = $("#modalClose");
const modalTitle = $("#modalTitle");
const modalMeta = $("#modalMeta");
const modalIntro = $("#modalIntro");
const modalBody = $("#modalBody");
const modalCover = $("#modalCover");
const modalFavorite = $("#modalFavorite");
const modalCopy = $("#modalCopy");
const modalFeedback = $("#modalFeedback");

let currentArticleId = null;
let previousFocus = null;

function openArticle(id) {
  const article = articleData[id];

  if (!article) {
    showToast("Yeh article abhi uplabdh nahi hai.");
    return;
  }

  previousFocus = document.activeElement;
  currentArticleId = id;

  modalTitle.textContent = article.title;
  modalMeta.textContent = `${article.category} · ${article.duration}`;
  modalIntro.textContent = article.intro;
  modalCover.querySelector("span").textContent = article.symbol;
  modalBody.replaceChildren();

  article.paragraphs.forEach(section => {
    const heading = document.createElement("h3");
    heading.textContent = section.heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = section.text;

    modalBody.append(heading, paragraph);
  });

  modalFeedback.textContent = "";
  updateModalFavouriteButton();

  articleModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeArticle() {
  if (articleModal.hidden) return;

  articleModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

function updateModalFavouriteButton() {
  if (!modalFavorite || !currentArticleId) return;

  const saved = isFavourite(currentArticleId);
  modalFavorite.textContent = saved
    ? "♥ Saved in favourites"
    : "♡ Save karein";
}

$$("[data-open-article]").forEach(button => {
  button.addEventListener("click", () => {
    openArticle(button.dataset.openArticle);
  });
});

modalClose.addEventListener("click", closeArticle);

articleModal.addEventListener("click", event => {
  if (event.target === articleModal) closeArticle();
});

modalFavorite.addEventListener("click", () => {
  if (currentArticleId) toggleFavourite(currentArticleId);
});

modalCopy.addEventListener("click", async () => {
  const article = articleData[currentArticleId];
  if (!article) return;

  const fullText = [
    article.title,
    article.intro,
    ...article.paragraphs.map(part => `${part.heading}\n${part.text}`),
    "— Divya Dhara"
  ].join("\n\n");

  await copyText(fullText);
});

updateFavouriteButtons();
applyFilters();

/* =========================================
   ACTIVE NAVIGATION STATE
========================================= */

const sections = $$("main section[id]");
const desktopLinks = $$(".desktop-nav .nav-link");
const bottomLinks = $$(".bottom-nav-item");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visibleSections = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visibleSections.length) return;

    const activeId = visibleSections[0].target.id;

    desktopLinks.forEach(link => {
      const active = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", active);
    });

    bottomLinks.forEach(link => {
      const active = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", active);
    });
  }, {
    rootMargin: "-18% 0px -58% 0px",
    threshold: [0, 0.1, 0.25, 0.5]
  });

  sections.forEach(section => sectionObserver.observe(section));
}

/* Close search when tapping outside */
document.addEventListener("click", event => {
  const clickedInsideSearch = searchPanel.contains(event.target);
  const clickedToggle = searchToggle.contains(event.target);

  if (!searchPanel.hidden && !clickedInsideSearch && !clickedToggle) {
    closeSearch();
  }
});
