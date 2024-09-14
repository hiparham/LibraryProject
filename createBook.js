export default function createBook(book) {
  const li = document.createElement("li")
  li.className = "shadow-md p-5 rounded-md list-none capitalize relative"
  li.dataset.id = book.name
  li.innerHTML = `
  <h2>${book.name}</h2>
  <p class="${book.done ? "text-green-700" : "text-red-500"}">${
    book.done ? "Already Read" : "Haven't read it yet."
  } | <button class="changeBtn text-xs bg-slate-900 text-white p-1 rounded-md">Change To ${
    book.done ? "Unread" : "Read"
  }</button> </p>
  <p>Pages : ${book.pages}</p>
  <span class="removeBtn text-red-500  font-bold absolute right-1 top-1 cursor-pointer text-2xl">&times;</span>
  `
  return li
}
