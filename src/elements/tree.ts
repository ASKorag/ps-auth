const tree: HTMLDivElement | null = document.querySelector('.tree');

tree?.addEventListener('animationend', deleteTree);

function deleteTree() {
  tree?.parentNode?.removeChild(tree);
}
