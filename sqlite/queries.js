 const COLLECTIONS = `
    SELECT c.id as col_id, c.title, i.id as item_id, i.name, i.price, i.imageUrl
    FROM collections c, items i
    WHERE i.collection_id = c.id
    ORDER BY c.id, c.title, i.name;
    `;

 const IS_MAIL_REGISTERED = `
      SELECT COUNT(id)>0 as exist
      FROM users
      WHERE email = ?;
    `;

 const USER_BY_EMAIL = `
      SELECT id, email, password
      FROM users
      WHERE email = ?;
    `;

 const USER_BY_ID = `
      SELECT id, displayName, email
      FROM users
      WHERE id = ?;
    `;

 const ADD_USER = `INSERT INTO users (id, displayName, email, password) 
      VALUES (null, ?, ?, ?);
    `;

 const LAST_ID = "SELECT last_insert_rowid() as id";


module.exports = {
  COLLECTIONS,
  IS_MAIL_REGISTERED,
  USER_BY_EMAIL,
  USER_BY_ID,
  ADD_USER,
  LAST_ID
}