require('discord.js');

async function etsi(msg) {
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
        const textChannels = await msg.guild.channels.cache.filter(channel => channel.type === 0);
        const asd = await textChannels.map(channel => channel);
        //console.log(asd.map(channel => channel.name))
        //valitaan satunnainen kanava
        let randomChannel
        const bot = await msg.guild.members.cache.get(msg.client.user.id)
        //console.log(bot)
        while (randomChannel === undefined) {
            let random = Math.floor(Math.random() * asd.length);
            randomChannel = asd[random];
            console.log(randomChannel.name)
            if (bot.permissionsIn(randomChannel).has('0x0000000000000400') && bot.permissionsIn(randomChannel).has('0x0000000000000800') && bot.permissionsIn(randomChannel).has('0x0000000000010000')) {
                console.log('botilla on lupa lähettää viestejä')
            }
            else {
                console.log('botilla ei ole lupaa lähettää viestejä')
                randomChannel = undefined
            }

        }
        console.log(randomChannel.name)
        //haetaan käyttäjän jäsen


        const userMember = await msg.guild.members.cache.filter(member => member.id === sana2).first();
        console.log(userMember.user.username)
        //haetaan jäsenen liittymisaika jottei kaiveta viestejä liian syvältä
        const joinedAt = userMember.joinedAt.getTime();
        //console.log(joinedAt)
        const currentTime = Date.now();
        //console.log(currentTime)
        const timeDifference = currentTime - joinedAt;
        //console.log(timeDifference)
        //haetaan satunnainen viesti jäsenen viesteistä

        //console.log(arvo)






        let randomValue = Math.floor(Math.random() * timeDifference);
        let arvo = (randomValue + joinedAt)
        console.log(arvo)
        let msges
        await randomChannel.messages.fetch({
            limit: 100,
            around: arvo
        }).then(async messages => {
            msges = messages
        });


        console.log(msges.map(m => m.author.username))
        var result = msges.find((m) => m.author.id === userMember.user.id)
        if (!result) {
            return false;
        } else {
            var a = msges.filter(m => m.author.id === userMember.user.id);
            let randomMessage = a.random();
            //console.log(randomMessage)
            //varmistetaan että viesti ei ole tyhjä, ei ala @, !, - tai http
            //console.log(randomMessage.content)
            while (randomMessage.content === undefined || randomMessage.content === '' || randomMessage.content[0] === "@" || randomMessage.content[0] === "!" || randomMessage.content[0] === "-" || randomMessage.content.startsWith("http")) {
                randomMessage = a.random();
            }
            console.log(randomMessage.content)
            if (randomMessage) {
                await randomMessage.reply('pal smal!')
                return true;
            }

        }


    }

};

module.exports = { etsi };  