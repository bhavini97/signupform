const div = document.querySelector("#list");
const ul = div.querySelector("ul");
document.addEventListener("DOMContentLoaded", () => {
  fetchDetails();
});
function fetchDetails() {
  axios
    .get(`http://localhost:3000/expense/add-expense`)
    .then((res) => {
      ul.innerHTML = ``;
      const data = res.data;
      data.forEach((element) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const str = `${element.amount} - ${element.description} - ${element.category}`;
        li.append(str);

        //del
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "btn btn-danger btn-sm ms-2";
        // delBtn.addEventListener("click", () => {
        //     //delete()
        // });
        li.append(delBtn);
        ul.append(li);
      });
    })
    .catch((err) => {});
}
function postExpense(event) {
  event.preventDefault();

  //getting all input value
  const amount = event.target.amt.value;
  const description = event.target.desc.value;
  const category = event.target.type.value;

  axios
    .post(`http://localhost:3000/expense/add-expense`, {
      amount: Number(amount),
      category: category,
      description: description,
    },{
        headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      fetchDetails();
    })
    .catch((err) => {
      console.error("something went wrong");
    });
}
