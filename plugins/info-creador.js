const handler = async (msg, { conn }) => {
  const ownerNumber = "15167096032@s.whatsapp.net"; // Número del creador
  const ownerName = "Russell xz 🤖"; // Nombre visible del creador

  const messageText = `📞 *Contacto del Creador del Subbot:*

Si tienes dudas, preguntas o sugerencias sobre el funcionamiento de *Nino Nakano*, puedes contactar a su creador.

📌 *Nombre:* ♰ÄŅĠËĻÏȚȞÖ⚔Ö₣ÏĊÏÄĻ♰
📌 *Número:* +51 920 227 615
💬 *Toca el contacto para enviarle un mensaje directo.`;

  // Enviar contacto vCard
  await conn.sendMessage(msg.key.remoteJid, {
    contacts: {
      displayName: ownerName,
      contacts: [
        {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nTEL;waid=${ownerNumber.split('@')[0]}:+${ownerNumber.split('@')[0]}\nEND:VCARD`
        }
      ]
    }
  });

  // Enviar texto informativo
  await conn.sendMessage(msg.key.remoteJid, {
    text: messageText
  }, { quoted: msg });
};


handler.help = ["creador", "owner"];
handler.tags = ["info"];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
