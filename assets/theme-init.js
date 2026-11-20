//for default light mode

(() => {
  try {
    const saved = localStorage.getItem("fcobiwundu-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = saved || preferred;
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
})();

//for default dark mode
// (() => {
//     try {
//         const saved = localStorage.getItem("fcobiwundu-theme");
//         const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

//         document.documentElement.dataset.theme = saved || "dark";
//     } catch (_) {
//         document.documentElement.dataset.theme = "dark";
//     }
// })();