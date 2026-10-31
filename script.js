document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${section.id}`;
          link.style.color = isActive ? "#edf2ff" : "";
        });
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => (item.style.color = ""));
    });
  });

  window.addEventListener("scroll", setActiveLink);
});