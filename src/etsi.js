require('discord.js');

function etsi(msg) {
    // puolitetaan kaksiosainen viesti
    let sana = msg.content.split(" ");
    //varmennus että viestissä on kaksi osaa
    try {
        if (sana.length === 2) {
            console.log('correct input amount');
        }
        else {
            console.log('incorrect input amount, use !pal <user>');
            return;
        }
    } catch (error) {
        console.log(error);
    }
    //muokataan toinen osa niin että siitä poistetaan <@! ja >
    const sana2 = sana[1].substring(2, sana[1].length - 1);

    if (sana[0] === '!pal') {
        //haetaan kaikki tekstikanavat
        const textChannels = msg.guild.channels.cache.filter(channel => channel.type === 0);
        const asd = textChannels.map(channel => channel);
        //valitaan satunnainen kanava
        const random = Math.floor(Math.random() * asd.length);
        const randomChannel = asd[random];
        //haetaan käyttäjän jäsen
        const userMember = msg.guild.members.cache.filter(member => member.id === sana2).first();
        //haetaan jäsenen liittymisaika jottei kaiveta viestejä liian syvältä
        const joinedAt = userMember.joinedAt.getTime();
        const currentTime = Date.now();
        const timeDifference = currentTime - joinedAt;
        //haetaan satunnainen viesti jäsenen viesteistä
        const randomValue = Math.floor(Math.random() * timeDifference);

        randomChannel.messages.fetch({
            limit: 100,
            around: randomValue
        }).then(messages => {
            try {
                const a = messages.filter(m => m.author.id === userMember.user.id);
                let randomMessage = a.random();
                //varmistetaan että viesti ei ole tyhjä, ei ala @, !, - tai http
                while (randomMessage.content === '' || randomMessage.content[0] === "@" || randomMessage.content[0] === "!" || randomMessage.content[0] === "-" || randomMessage.content.startsWith("http")) {
                    randomMessage = a.random();
                }
                randomMessage.reply('pal smal!')
            } catch {
                console.log('error');
            }
        });

    }
};

module.exports = { etsi };  