# E-Commerce: Backend API

API developed in Express.js for my **E-Commerce Full Stack** proyect.

## Routes

### User

<details>
<summary><code>POST</code> <code><b>/api/account/register</b></code> (registers a new user to the website)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | username    | required    | User's nickname    | body               |
> | name        | required    | User's full name   | body               |
> | email       | required    | User's email       | body               |
> | password    | required    | User's password    | body               |
> | avatar      | optional    | User's avatar      | body               |

 </details>

---

<details>
<summary><code>POST</code> <code><b>/api/account/login</b></code> (user's login to the website)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b>                | <b>Received in</b> |
> | ----------- | ----------- | --------------------------------- | ------------------ |
> | email       | required    | User's email                      | body               |
> | password    | required    | User's password                   | body               |
> | remember    | optional    | If exists, session doesn't expire | body               |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/account/logout</b></code> (user's logout from the website)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | \_id        | required    | User's \_ID        | cookies            |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/account/unregister</b></code> (user's unregister from the website)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | \_id        | required    | User's \_ID        | cookies            |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/account/userList</b></code> (gets list of registered users)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>   | <b>Received in</b> |
> | ------------- | ----------- | -------------------- | ------------------ |
> | authorization | required    | User's token (admin) | headers            |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/account/userGet</b></code> (gets user data)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ------------- | ----------- | ------------------ | ------------------ |
> | authorization | required    | User's token       | headers            |

 </details>

### Products

---

<details>
<summary><code>POST</code> <code><b>/api/products/add</b></code> (adds a new product)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>               | <b>Received in</b> |
> | ------------- | ----------- | -------------------------------- | ------------------ |
> | authorization | required    | User's token (admin)             | headers            |
> | prod_id       | required    | Product's storage ID.            | body               |
> | name          | required    | Product's name.                  | body               |
> | price         | required    | Product's price.                 | body               |
> | tags          | required    | Product's tags.                  | body               |
> | category      | required    | Product's categories.            | body               |
> | subCategory   | optional    | Product's subcategories.         | body               |
> | desc          | optional    | Product's description.           | body               |
> | img           | required    | Product's image (type and data). | body               |
> | reputation    | optional    | Product's reputation.            | body               |
> | brand         | required    | Product's brand.                 | body               |
> | color         | optional    | Product's color.                 | body               |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/products/get</b></code> (gets product list)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | None        | required    | N/A                |                    |

 </details>

---

<details>
<summary><code>PUT</code> <code><b>/api/products/edit</b></code> (edits a product)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>               | <b>Received in</b> |
> | ------------- | ----------- | -------------------------------- | ------------------ |
> | authorization | required    | User's token (admin)             | headers            |
> | \_id          | required    | Product's collection ID.         | body               |
> | prod_id       | required    | Product's storage ID.            | body               |
> | name          | required    | Product's name.                  | body               |
> | price         | required    | Product's price.                 | body               |
> | tags          | required    | Product's tags.                  | body               |
> | category      | required    | Product's categories.            | body               |
> | subCategory   | optional    | Product's subcategories.         | body               |
> | desc          | optional    | Product's description.           | body               |
> | img           | required    | Product's image (type and data). | body               |
> | reputation    | optional    | Product's reputation.            | body               |
> | brand         | required    | Product's brand.                 | body               |
> | color         | optional    | Product's color.                 | body               |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/products/delete/:id</b></code> (deletes a product)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>       | <b>Received in</b> |
> | ------------- | ----------- | ------------------------ | ------------------ |
> | authorization | required    | User's token (admin)     | headers            |
> | id            | required    | Product's collection ID. | params             |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/products/search/</b></code> (searchs in products collection)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>   | <b>Received in</b> |
> | ------------- | ----------- | -------------------- | ------------------ |
> | authorization | required    | User's token (admin) | headers            |
> | srch          | required    | Search field.        | query              |
> | ctg           | required    | Search category.     | query              |

 </details>

### Cart

<details>
<summary><code>GET</code> <code><b>/api/cart/getCart</b></code> (gets user's cart)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ------------- | ----------- | ------------------ | ------------------ |
> | authorization | required    | User's token       | headers            |
> | \_id          | required    | User's ID.         | body               |

 </details>

---

<details>
<summary><code>POST</code> <code><b>/api/cart/add/:id</b></code> (adds a product to user's cart)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>    | <b>Received in</b> |
> | ------------- | ----------- | --------------------- | ------------------ |
> | authorization | required    | User's token          | headers            |
> | id            | required    | Product's storage ID. | params             |

 </details>

---

<details>
<summary><code>PUT</code> <code><b>/api/cart/delete-item/:id</b></code> (deletes a product from user's cart)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>    | <b>Received in</b> |
> | ------------- | ----------- | --------------------- | ------------------ |
> | authorization | required    | User's token          | headers            |
> | id            | required    | Product's storage ID. | params             |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/cart/delete-all-item/:id</b></code> (deletes all products from user's cart)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>    | <b>Received in</b> |
> | ------------- | ----------- | --------------------- | ------------------ |
> | authorization | required    | User's token          | headers            |
> | id            | required    | Product's storage ID. | params             |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/cart/clear/</b></code> (clears user's cart)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ------------- | ----------- | ------------------ | ------------------ |
> | authorization | required    | User's token       | headers            |

 </details>

### Categories

<details>
<summary><code>POST</code> <code><b>/api/categories/add</b></code> (adds a new category)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>        | <b>Received in</b> |
> | ------------- | ----------- | ------------------------- | ------------------ |
> | authorization | required    | User's token (admin)      | headers            |
> | id            | required    | Category's storage ID.    | body               |
> | name          | required    | Category's name.          | body               |
> | subCategory   | optional    | Category's subcategories. | body               |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/categories/get</b></code> (gets category list)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | None        | required    | N/A                |                    |

 </details>

---

<details>
<summary><code>PUT</code> <code><b>/api/categories/edit</b></code> (edits a category)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>        | <b>Received in</b> |
> | ------------- | ----------- | ------------------------- | ------------------ |
> | authorization | required    | User's token (admin)      | headers            |
> | \_id          | required    | Category's collection ID. | body               |
> | category      | required    | Category's new data.      | body               |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/categories/delete/</b></code> (deletes a category)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>        | <b>Received in</b> |
> | ------------- | ----------- | ------------------------- | ------------------ |
> | authorization | required    | User's token (admin)      | headers            |
> | id            | required    | Category's collection ID. | params             |

 </details>

### Subcategories

<details>
<summary><code>POST</code> <code><b>/api/subCategories/add</b></code> (adds a new subcategory)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>        | <b>Received in</b> |
> | ------------- | ----------- | ------------------------- | ------------------ |
> | authorization | required    | User's token (admin)      | headers            |
> | id            | required    | Subcategory's storage ID. | body               |
> | name          | required    | Subcategory's name.       | body               |

 </details>

---

<details>
<summary><code>GET</code> <code><b>/api/subCategories/get</b></code> (gets subcategory list)</summary>

##### Parameters

> | <b>name</b> | <b>type</b> | <b>description</b> | <b>Received in</b> |
> | ----------- | ----------- | ------------------ | ------------------ |
> | None        | required    | N/A                |                    |

 </details>

---

<details>
<summary><code>PUT</code> <code><b>/api/subCategories/edit</b></code> (edits a subcategory)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>           | <b>Received in</b> |
> | ------------- | ----------- | ---------------------------- | ------------------ |
> | authorization | required    | User's token (admin)         | headers            |
> | \_id          | required    | Subcategory's collection ID. | body               |
> | subCategory   | required    | Subcategory's new data.      | body               |

 </details>

---

<details>
<summary><code>DELETE</code> <code><b>/api/subCategories/delete/</b></code> (deletes a subcategory)</summary>

##### Parameters

> | <b>name</b>   | <b>type</b> | <b>description</b>           | <b>Received in</b> |
> | ------------- | ----------- | ---------------------------- | ------------------ |
> | authorization | required    | User's token (admin)         | headers            |
> | id            | required    | Subcategory's collection ID. | query              |

 </details>

---
