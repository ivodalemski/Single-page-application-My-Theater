import { getEventById, updateEvent } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (event, onSubmit) => html`<section id="editPage">
  <form @submit=${onSubmit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        .value=${event.title}
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input
        id="date"
        name="date"
        type="text"
        placeholder="Month Day, Year"
        .value=${event.date}
      />
    </div>
    <div>
      <label for="author">Author:</label>
      <input
        id="author"
        name="author"
        type="text"
        placeholder="Author"
        .value=${event.author}
      />
    </div>
    <div>
      <label for="description">Theater Description:</label>
      <textarea id="description" name="description" placeholder="Description">
${event.description}</textarea
      >
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        .value=${event.imageUrl}
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
</section> `;

export async function editView(ctx) {
  const event = await getEventById(ctx.params.id);

  ctx.render(editTemplate(event, onSubmit));

  async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const event = {
      title: formData.get("title"),
      date: formData.get("date"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
    };

    if (
      event.title == "" ||
      event.date == "" ||
      event.author == "" ||
      event.imageUrl == "" ||
      event.description == ""
    ) {
      return alert("All fields are required!");
    }

    await updateEvent(ctx.params.id, event);
    ev.target.reset();
    ctx.page.redirect("/theaters/" + ctx.params.id);
  }
}
