import ws from 'ws';

let handler = async (m, { conn, usedPrefix, args }) => {
    // Validación del número de teléfono o mención
    if (!args[0] || !/^\d+$/.test(args[0])) {
        return m.reply(`⚠ El número proporcionado no es válido. Usa el formato correcto.`);
    }

    let botJid = m.mentionedJid && m.mentionedJid.length > 0 
        ? m.mentionedJid[0] 
        : args[0]?.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
    let selectedBot = users.find(conn => conn.user.jid === botJid);

    // Si no se encuentra el bot
    if (!selectedBot) {
        return m.reply("⚠ No se encontró un bot conectado con esa mención o número. Usa /listjadibot para ver los bots disponibles.");
    }

    // Comprobación de la conexión activa
    if (!selectedBot.ws.socket || selectedBot.ws.socket.readyState === ws.CLOSED) {
        return m.reply("⚠ El bot seleccionado no está disponible actualmente.");
    }

    // Establecer el bot primario
    let chat = global.db.data.chats[m.chat];
    chat.primaryBot = botJid;

    // Enviar mensaje de éxito
    conn.sendMessage(m.chat, { 
        text: `✅ El bot @${botJid.split('@')[0]} ha sido establecido como primario en este grupo. Los demás bots no responderán aquí.`,
        mentions: [botJid]
    }, { quoted: m });
};

handler.help = ['setprimary <@tag>'];
handler.tags = ['jadibot'];
handler.command = ['setprimary'];
handler.group = true;
handler.register = true;

export default handler;