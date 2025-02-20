import jsonServer from 'json-server';
import pkg from 'pg';
const { Pool } = pkg;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// PostgreSQL Database Connection
const pool = new Pool({
   connectionString: process.env.DATABASE_URL, // Render will provide this
   ssl: { rejectUnauthorized: false }
});

// Fetch all links from PostgreSQL
server.get('/links', async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM links');
      res.json(result.rows);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Add a new link
server.post('/links', async (req, res) => {
   try {
      const { name, url } = req.body;
      const result = await pool.query(
         'INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *',
         [name, url]
      );
      res.json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Delete a link
server.delete('/links/:id', async (req, res) => {
   try {
      const { id } = req.params;
      await pool.query('DELETE FROM links WHERE id = $1', [id]);
      res.json({ message: 'Deleted successfully' });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`JSON Server is running on port ${PORT}`);
});
