interface post {
  url: string;
  id: string;
}

export type sortedPosts = { [key: number]: post[] };

const classes: { [key: number]: string } = {
  2: "Dubs",
  3: "Trips",
  4: "Quads",
  5: "Quints",
  6: "Kek's Will",
};

chrome.tabs.query({ active: true }, tabs => {
  const tab = tabs[0];
  const urls = tab.url?.match(/^(.*?)thread/);
  let baseUrl: string;
  if (!urls) {
    baseUrl = tabs[0].url! + "thread";
  } else {
    baseUrl = urls[0];
  }

  chrome.runtime.onMessage.addListener((posts: sortedPosts) => {
    // Reset list
    const sections = document.getElementsByTagName("section");
    while (sections[0]) {
      sections[0].remove();
    }

    for (let i = 6; i > 1; i--) {
      if (!posts[i]) {
        continue;
      }
      const section = document.createElement("section");
      section.innerHTML = `
      <h2>${classes[i]}</h2>
      `;
      posts[i].forEach(post => {
        const a = document.createElement("a");
        a.innerText = ">>" + post.id;
        a.onclick = () => chrome.tabs.update({ url: `${baseUrl}/${post.url}` });
        section.append(a);
      });
      document.body.append(section);
    }
  });
});

chrome.tabs.executeScript({ file: "content.js" });
