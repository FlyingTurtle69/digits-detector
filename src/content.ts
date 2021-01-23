import { sortedPosts } from "./popup";

const classes: { [key: number]: string } = {
  2: "dubs",
  3: "trips",
  4: "quads",
  5: "quints",
  6: "kek",
};

function highlightPosts() {
  const posts = document.querySelectorAll(".postContainer") as NodeListOf<HTMLElement>;

  let sortedPosts: sortedPosts = {};

  posts.forEach(element => {
    const no = element.id.substring(2);

    function characterFromEnd(index: number) {
      return no[no.length - index];
    }

    let digits = 1;
    for (let i = 2; i < 7; i++) {
      if (characterFromEnd(1) === characterFromEnd(i)) {
        digits = i;
      } else {
        break;
      }
    }

    let post: HTMLElement;
    let thread: string;

    if (element.classList.contains("opContainer")) {
      post = element.parentElement!;
      post
        .querySelector(".summary")
        ?.firstChild?.addEventListener("click", () => setTimeout(() => highlightPosts(), 2000));
      thread = no;
    } else {
      post = element.lastChild as HTMLElement;
      thread = element.parentElement!.id.substring(1);
    }

    if (digits === 1) {
      return;
    }

    post.classList.add(classes[digits]);

    const transferInfo = { url: `${thread}#p${no}`, id: no };

    if (!sortedPosts[digits]) {
      sortedPosts[digits] = [transferInfo];
    } else {
      sortedPosts[digits].push(transferInfo);
    }
  });

  if (sortedPosts) {
    chrome.runtime.sendMessage(sortedPosts);
  }
}

highlightPosts();
