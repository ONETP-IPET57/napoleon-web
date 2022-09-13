// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    /* const data = JSON.parse(req.body);
    console.log(data); */
    res.status(200).json({ 'username': req.body.username, 'role': 'Administrador', 'accesssToken': 'asjkdhajkshdajsk', 'email': 'lol@lol.com' });
  }
}
