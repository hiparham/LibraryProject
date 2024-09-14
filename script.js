import createBook from "./createBook.js"

const form = document.querySelector("form")
const readDetail = document.querySelector('select[name="read"]')
const bookName = document.querySelector('input[name="name"]')
const bookPages = document.querySelector('input[name="pages"]')
const main = document.querySelector(".main")
const formAlert = document.querySelector("form .alert")

let allBooks = []

function Book(name, done, pages) {
  this.name = name
  this.done = done
  this.pages = pages
}

const displayBooks = () => {
  main.innerHTML = ""
  allBooks.forEach((book) => {
    const yo = createBook(book)
    main.appendChild(yo)
  })
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const read = readDetail.value === "readIt" ? true : false
  const name = bookName.value
  const pages = bookPages.value

  if (isNaN(Number(pages)) || Number(pages) < 1) {
    formAlert.classList.remove("hidden")
    formAlert.textContent = "Please Insert a real number of pages."
    setTimeout(() => {
      formAlert.classList.add("hidden")
      formAlert.textContent = "All fields must be filled."
    }, 1000)
    return
  }

  if (name && pages) {
    const myBook = new Book(name, read, pages)

    allBooks.push(myBook)

    displayBooks()

    bookName.value = ""
    bookPages.value = ""
    readDetail.value = "readIt"

    formAlert.classList.add("hidden")

    bookName.blur()
    bookPages.blur()
    readDetail.blur()
  } else {
    formAlert.classList.remove("hidden")
    setTimeout(() => {
      formAlert.classList.add("hidden")
    }, 500)
  }
})

main.addEventListener("click", (e) => {
  const el = e.target
  if (el.classList[0] === "removeBtn") {
    const id = e.target.parentElement.dataset.id
    allBooks = allBooks.filter((x) => x.name !== id)
    displayBooks()
    return
  }
  if (el.classList[0] !== "changeBtn") return
  const itemFind = allBooks.find(
    (x) => x.name === e.target.parentElement.parentElement.dataset.id
  )

  allBooks = allBooks.map((x) =>
    x.name !== itemFind.name ? x : { ...x, done: !itemFind.done }
  )
  displayBooks()
})
