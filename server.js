const Discord = require("discord.js");
const timeBetweenDates = require("time-between-dates");
const moment = require("moment");
require(__dirname + "/keepOnline.js");

const TOKEN = "";
const PREFIX = "!";

const config = require("./config.json");
const creds = require("./client_secret.json");
const creds2 = require("./client_secret2.json");
// starts bot
var bot = new Discord.Client();

var GoogleSpreadsheet = require("google-spreadsheet");
var doc = new GoogleSpreadsheet("1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4");
var doc2 = new GoogleSpreadsheet(
  "1qqqBZ8qD1btguVx-VTQyx_Rgt5dtWyKW8-Y2tJSTb2c"
);

bot.on("ready", function() {
  console.log("Ready");
});

//-*****************************

//ROBLOX COMMANDS/ROBLOX API
const Roblox = require("noblox.js");

//-*****************************

//bot looks for message
bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return; // if its the bot messaging itself, it ignores it
  if (!message.content.startsWith(PREFIX)) return; //random text w/o prefix get ignored too
  var args = message.content.substring(PREFIX.length).split(" "); // the commands get split by spaces into an array

  switch (
    args[0].toLowerCase() //helps commands not become case sensitive
  ) {
    case "ping": //really basic ping command -- not needed but kept
      message.channel.send("Obedience ensures your safety.", {
        files: [
          "https://cdn.glitch.com/3a7537c6-4b81-486b-ad93-a85669622888%2FpeepOO.png?v=1574295455226.png"
        ]
      });
      break;

    case "help": //really basic info command -- not needed yet, working on other commands
      var infoList = new Discord.RichEmbed()
        .addField(
          "Blacklist command",
          "!blacklist [Username] [Blacklisted by] [Reason] [Evidence] [Additional Info.]"
        )
        .addField(
          "Suspension command",
          "!suspend [Username] [Suspended by] [Tier] [Proof] [Additional info.]"
        )
        .addField("Get command", "!get [Username]")
        .addField("Remove command", "!remove [Username]")
        .addField("Tiers information", "!getTiers")
        .addField("Acronym information", "!geta")
        .addField("Credits", "SenorMexico, Latedownload")
        .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif") //'https://i.imgur.com/r2CVYa4.jpg' -- poseidon pfp
        .setTimestamp();
      message.channel.send(infoList);
      break;
    case "gettiers":
      var reasons =
        "[1] Exploiters in and out of Vaktovia\n[2] People committing real life illegal acts\n[3] People abusing their power in Vaktovia\n[4] Scammers\n[5] Individuals whom are extremely against Vaktovia\n[6] Alternative, shared, or purchased accounts";
      var tiers =
        "[Tier 0] Indefinite Suspension\n[Tier 1] 1 Day Suspension\n[Tier 2] 1 Week Suspension\n[Tier 3] 1 Month Suspension\n[Tier 4] 2 Month Suspension\n[Tier 5] 4 Month Suspension\n[Tier 6] 6 Month Suspension\n[Tier 7] 8 Month Suspnesion\n[Tier 8] 1 Year Suspension\n[Tier 9] 18 Month Suspension\n[Tier 10] 2 Year Suspension\n[Tier 11] 3 Year Suspension\n[Tier 12] 4 Year Suspension";

      var infoList = new Discord.RichEmbed()
        .addField("Blacklist Categories", reasons)
        .addField("Suspension Tiers", tiers)
        .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif") //'https://i.imgur.com/r2CVYa4.jpg' -- poseidon pfp
        .setTimestamp();
      message.channel.send(infoList);
      break;
    case "geta":
      var acronyms =
        "BD - Blacklist Department\nBDM - Blacklist Management\nJD - Justice Department\nVACS - VAC Staff\nVACM - VAC Management\nLC - Legate Council\nHC - High Command";
      var infoList = new Discord.RichEmbed()
        .addField("Acronyms", acronyms)
        .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif") //'https://i.imgur.com/r2CVYa4.jpg' -- poseidon pfp
        .setTimestamp();
      message.channel.send(infoList);
      /*case "bd":
          blacklistedBy = "Blacklist Department";
          break;
        case "jd":
          blacklistedBy = "Justice Department";
          break;
        case "vacs":
          blacklistedBy = "VAC Staff";
          break;
        case "vacm":
          blacklistedBy = "VAC Management";
          break;
        case "bdm":
          blacklistedBy = "Blacklist Management";
          break;
        case "lc":
          blacklistedBy = "Legate Council";
          break;
        case "hc":
          blacklistedBy = "High Command";*/
      break;
    case "blacklist": //blacklist command to add a user into a spreadsheet
      if (
        !message.member.roles.get("485930041272827914") &&
        !message.member.roles.get("485929510492045332")
      ) {
        console.log("role not found!");
        message.channel.send("You're not authorized to use this command.");
        break;
      }
      //411341455014100992
      var mainMessage = args[1] + " has been blacklisted!"; //informs who's been blacklisted
      var addInfo = "";
      var rID;
      for (var i = 5; i < args.length; i++) {
        if (!i == args.length - 1) {
          addInfo += args[i];
        } else {
          addInfo += args[i] + " ";
        }
      }
      if (addInfo == "") {
        addInfo = "-";
      }
      console.log(addInfo);
      var now = moment().format("L");
      var reasonList = args[3].split(",");
      var reasonLoop = "";
      var reason = [
        "[1] Exploiters in and out of Vaktovia",
        "[2] People committing real life illegal acts",
        "[3] People abusing their power in Vaktovia",
        "[4] Scammers",
        "[5] Individuals whom are extremely against Vaktovia",
        "[6] Alternative, shared, or purchased accounts"
      ];

      for (var i = 0; i < reasonList.length; i++) {
        reasonLoop += reason[reasonList[i] - 1] + "\n";
      }
      var blacklistedBy = "";
      switch (args[2].toLowerCase()) {
        case "bd":
          blacklistedBy = "Blacklist Department";
          break;
        case "jd":
          blacklistedBy = "Justice Department";
          break;
        case "vacs":
          blacklistedBy = "VAC Staff";
          break;
        case "vacm":
          blacklistedBy = "VAC Management";
          break;
        case "bdm":
          blacklistedBy = "Blacklist Management";
          break;
        case "lc":
          blacklistedBy = "Legate Council";
          break;
        case "hc":
          blacklistedBy = "High Command";
          break;
        default:
          blacklistedBy = args[2];
          break;
      }
      //var reasonFinal = reasonLoop.split("undefined");
      //stored_username id blacklisted_by reason evidence Additional_info, today
      // 0               1      2            3       4        5              6
      var list = [args[1], rID, blacklistedBy, args[3], args[4], addInfo, now]; // !!!! creates an array of all the arguments

      Roblox.getIdFromUsername(args[1])
        .then(id => {
          rID = id;
          list[1] = id;
          findTest(true, true, list);
          var blacklistMessage = new Discord.RichEmbed() //embeded message to send back
            .setAuthor(
              "Command used by: " + message.author.username,
              message.author.avatarURL
            )
            .setDescription(mainMessage)
            .addField("User ID:", rID, true)
            .addField("Date Blacklisted:", now, true)
            .addField("Blacklisted by:", blacklistedBy, true)
            .addField("Reason: ", reasonLoop)
            .addField("Additional Info:", addInfo)
            .setColor("0x000000")
            .setThumbnail(
              "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                rID
            )
            .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif") //'https://i.imgur.com/r2CVYa4.jpg' -- poseidon pfp
            .setTimestamp();
          message.channel.send(blacklistMessage); //sends back embeded message
          let VIADiscord = bot.guilds.get("485928637162455060");
          let logChannel = VIADiscord.channels.get("485951274249093132");
          logChannel.send(
            args[1] + " | Blacklist added, category " + list[3] + "."
          );
        })
        .catch(err => {
          console.log(err);
          message.channel.send(
            new Discord.RichEmbed()
              .addField("ERROR", "User doesn't exist")
              .setFooter(
                "Made by SenorMexico",
                "https://i.imgur.com/Mh0pMxb.gif"
              )
              .setTimestamp()
          );
        });

      break;
    case "suspend": //blacklist command to add a user into a spreadsheet
      if (
        !message.member.roles.get("485930041272827914") &&
        !message.member.roles.get("485929510492045332")
      ) {
        console.log("role not found!");
        message.channel.send("You're not authorized to use this command.");
        break;
      }
      var tierList = [
        9999999,
        1.0145625,
        7.60921875,
        30.436875,
        60.87375,
        121.7475,
        182.62125,
        243.495,
        365.2425,
        547.86375,
        730.485
      ];
      var grabTier = tierList[args[3]];

      var now = Date.now();
      var timeDifConv = grabTier * 24 * 60 * 60 * 1000;
      var sum = now + timeDifConv;
      var result = moment()
        .add(grabTier, "days")
        .calendar();
      var tb = timeBetweenDates(sum, now, "days", 1);
      console.log(args[1]);
      var rID;
      var addInfo = "";
      var argList;
      console.log(args[5]);

      for (var i = 5; i < args.length; i++) {
        if (i == args.length - 1) {
          addInfo += args[i];
        } else {
          addInfo += args[i] + " ";
        }
      }
      console.log(addInfo);
      if (addInfo == "" || addInfo == undefined) {
        addInfo = "-";
      }
      var suspendedBy = "";
      switch (args[2].toLowerCase()) {
        case "bd":
          suspendedBy = "Blacklist Department";
          break;
        case "jd":
          suspendedBy = "Justice Department";
          break;
        case "vacs":
          suspendedBy = "VAC Staff";
          break;
        case "vacm":
          suspendedBy = "VAC Management";
          break;
        case "bdm":
          suspendedBy = "Blacklist Management";
          break;
        case "lc":
          suspendedBy = "Legate Council";
          break;
        case "hc":
          suspendedBy = "High Command";
          break;
        default:
          suspendedBy = args[2];
          break;
      }
      var argList = [
        args[1],
        rID,
        suspendedBy,
        args[3],
        args[4],
        addInfo,
        moment().format("L")
      ];
      // stored usernamme,     id , by ,      tier ,proof   additional info  date
      // 0                     1   2             3 4             5               6

      //console.log(argList);

      Roblox.getIdFromUsername(args[1])
        .then(id => {
          rID = id;
          argList[1] = id;
          findTest(true, false, argList);
          var suspendMessage = new Discord.RichEmbed()
            .setAuthor(
              "Suspended by: " + message.author.username,
              message.author.avatarURL
            )
            .addField(args[1] + " has been suspended for ", tb + " days!")
            .setColor("0x000000")
            .addField("Approx. end of suspension: ", result)
            .addField("Suspended by", suspendedBy)
            .addField("Tier", args[3], true)
            .addField("Roblox ID", rID, true)
            .addField("Proof", args[4], true)
            .addField("Reason:", argList[5])
            .setThumbnail()
            .setThumbnail(
              "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                rID
            )
            .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif")
            .setTimestamp();
          message.channel.send(suspendMessage);
          let VIADiscord = bot.guilds.get("485928637162455060");
          let logChannel = VIADiscord.channels.get("485951274249093132");
          logChannel.send(
            args[1] + " | Suspension added, tier " + args[3] + "."
          );
        })
        .catch(err => {
          console.log(err);
          message.channel.send(
            new Discord.RichEmbed()
              .addField("ERROR", "User doesn't exist")
              .setFooter(
                "Made by SenorMexico",
                "https://i.imgur.com/Mh0pMxb.gif"
              )
              .setTimestamp()
          );
        });

      break;
    case "get":
      message.channel.send("Searching both sheets.");
      Roblox.getIdFromUsername(args[1])
        .then(id => {
          //list[i].group.id == '1181678' || list[i].group.id == '3048241' ||list[i].group.id == '5501000' || list[i].group.id == '5486470'|| list[i].group.id == '4105128'
          // var idList = [[1181678,"The Imperial Insurgence"],[3048241,"Insurgent Ascension Program"],[5501000,"The Insurgent Ascension Program"],[5486470,"Imperium of Arcon"],[4105128,"𝐄jército Mexicano"]];
          doc.useServiceAccountAuth(creds, function(err) {
            doc.getRows(
              1,
              {
                offset: 1
              },
              function(err, rows) {
                if (err) {
                  console.log(err);
                } else {
                  let posted = false;
                  let backcheck = false;
                  rows.forEach(element => {
                    if (element["robloxid"] == id) {
                      let evidence = "N/A";
                      let notes = "N/A";
                      if (
                        element["evidence"] != "" &&
                        element["evidence"] != " "
                      ) {
                        evidence = element["evidence"];
                      }
                      if (
                        element["additionalinformation"] != "" &&
                        element["additionalinformation"] != " "
                      ) {
                        notes = element["additionalinformation"];
                      }
                      var reasonLoop = "";
                      var reason = [
                        "[1] Exploiters in and out of Vaktovia",
                        "[2] People committing real life illegal acts",
                        "[3] People abusing their power in Vaktovia",
                        "[4] Scammers",
                        "[5] Individuals whom are extremely against Vaktovia",
                        "[6] Alternative, shared, or purchased accounts"
                      ];
                      console.log(element["reason"].split(","));
                      var wholeList = element["reason"].split(",");
                      console.log(element["reason"].length);
                      console.log(reason[parseInt(element["reason"], 10) - 1]);
                      for (var i = 0; i < wholeList.length; i++) {
                        reasonLoop +=
                          reason[parseInt(wholeList[i], 10) - 1] + "\n";
                      }
                      var reasonFinal = reasonLoop.split("undefined");

                      let getMessage = new Discord.RichEmbed()
                        .setAuthor(
                          "Blacklist Database | " + element["storedusername"]
                        )
                        .setColor("0x000000")
                        .addField("Roblox ID:", element["robloxid"], false)
                        .addField(
                          "Blacklisted By:",
                          element["blacklistedby"],
                          false
                        )
                        .addField("Proof:", evidence, false)
                        .addField("Add. Notes:", notes, false)
                        .addField("Reason(s):", reasonFinal)
                        .setThumbnail()
                        .setThumbnail(
                          "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                            element["robloxid"]
                        )
                        .setFooter(
                          "Made by SenorMexico",
                          "https://i.imgur.com/Mh0pMxb.gif"
                        )
                        .setTimestamp();
                      message.channel.send(getMessage);
                      posted = true;
                      doc.getRows(
                        4,
                        {
                          //offset: 6,
                        },
                        function(err, rows) {
                          if (err) {
                            console.log(err);
                          } else {
                            rows.forEach(element => {
                              if (element["robloxid"] == id) {
                                var amount = parseInt(element["numlogs"], 10);
                                var history = "";
                                for (var i = 1; i <= amount; i++) {
                                  history +=
                                    element["date" + i] +
                                    " - " +
                                    element["reason" + i] +
                                    "\n";
                                }

                                let newMessage = new Discord.RichEmbed().addField(
                                  "History: ",
                                  history
                                );
                                message.channel.send(newMessage);
                              }
                            });
                          }
                        }
                      );
                    }
                  });
                  if (posted == false) {
                    doc.useServiceAccountAuth(creds, function(err) {
                      doc.getRows(
                        2,
                        {
                          offset: 1
                        },
                        function(err, rows) {
                          if (err) {
                            console.log(err);
                          } else {
                            rows.forEach(element => {
                              if (element["robloxid"] == id) {
                                var tierList = [
                                  9999999,
                                  1.0145625,
                                  7.60921875,
                                  30.436875,
                                  60.87375,
                                  121.7475,
                                  182.62125,
                                  243.495,
                                  365.2425,
                                  547.86375,
                                  730.485
                                ];
                                var grabTier =
                                  tierList[Number(element["tier"])];
                                var test = moment(element["datesuspended"])
                                  .add(grabTier, "days")
                                  .format("MMMM DD, YYYY");
                                /*var now = Date.now();
                                var timeDifConv =
                                  grabTier * 24 * 60 * 60 * 1000;
                                var sum = now + timeDifConv;
                                var result = moment()
                                  .add(grabTier, "days")
                                  .calendar();
                                var tb = timeBetweenDates(sum, now, "days", 1);*/

                                let evidence = "N/A";
                                let notes = "N/A";
                                if (
                                  element["proof"] != "" &&
                                  element["proof"] != " "
                                ) {
                                  evidence = element["proof"];
                                }
                                if (
                                  element["additionalinformation"] != "" &&
                                  element["additionalinformation"] != " "
                                ) {
                                  notes = element["additionalinformation"];
                                }
                                let getMessage = new Discord.RichEmbed()
                                  .setAuthor(
                                    "Blacklist Database | " +
                                      element["storedusername"]
                                  )
                                  .setColor("0x000000")
                                  .addField(
                                    "Roblox ID:",
                                    element["robloxid"],
                                    false
                                  )

                                  .addField("Tier:", element["tier"], false)
                                  .addField(
                                    "Date Suspended:",
                                    element["datesuspended"],
                                    false
                                  )
                                  .addField("Suspension Ends:", test, false)
                                  .addField(
                                    "Suspended By:",
                                    element["suspendedby"],
                                    false
                                  )
                                  .addField("Proof:", evidence, false)
                                  .addField("Reason:", element["reason"], false)
                                  .addField("Add. Notes:", notes, false)
                                  //.addField("Suspension Ends:", element["datesuspensionends"], false)
                                  .setThumbnail()
                                  .setThumbnail(
                                    "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                                      element["robloxid"]
                                  )
                                  .setFooter(
                                    "Made by SenorMexico",
                                    "https://i.imgur.com/Mh0pMxb.gif"
                                  )
                                  .setTimestamp();

                                message.channel.send(getMessage);
                                doc.getRows(
                                  4,
                                  {
                                    //offset: 6,
                                  },
                                  function(err, rows) {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      rows.forEach(element => {
                                        if (element["robloxid"] == id) {
                                          var amount = parseInt(
                                            element["numlogs"],
                                            10
                                          );
                                          var history = "";
                                          for (var i = 1; i <= amount; i++) {
                                            history +=
                                              element["date" + i] +
                                              " - " +
                                              element["reason" + i] +
                                              "\n";
                                          }

                                          let newMessage = new Discord.RichEmbed().addField(
                                            "History: ",
                                            history
                                          );
                                          message.channel.send(newMessage);
                                        }
                                      });
                                    }
                                  }
                                );

                                posted = true;
                              }
                            });
                            if (posted == false) {
                              message.channel.send(
                                "This person wasn't found on the blacklist or suspension sheet."
                              );
                              doc.getRows(
                                4,
                                {
                                  //offset: 6,
                                },
                                function(err, rows) {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    rows.forEach(element => {
                                      if (element["robloxid"] == id) {
                                        var amount = parseInt(
                                          element["numlogs"],
                                          10
                                        );
                                        var history = "";
                                        for (var i = 1; i <= amount; i++) {
                                          history +=
                                            element["date" + i] +
                                            " - " +
                                            element["reason" + i] +
                                            "\n";
                                        }

                                        let newMessage = new Discord.RichEmbed()
                                          .addField("History: ", history)
                                          .setTimestamp()
                                          .setFooter(
                                            "Made by SenorMexico",
                                            "https://i.imgur.com/Mh0pMxb.gif"
                                          );
                                        message.channel.send(newMessage);
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        }
                      );
                    });
                  }
                }
              }
            );
          });
        })
        .catch(err => {
          message.channel.send("This user was not found on Roblox.");
        });
      break;
    case "remove":
      if (
        !message.member.roles.get("485930041272827914") &&
        !message.member.roles.get("485929510492045332")
      ) {
        //411341455014100992
        console.log("role not found!");
        message.channel.send("You're not authorized to use this command.");
        break;
      }
      message.channel.send(
        "Working my magic, please wait until you receive confirmation..."
      );
      Roblox.getIdFromUsername(args[1])
        .then(id => {
          doc.useServiceAccountAuth(creds, function(err) {
            doc.getRows(
              1,
              {
                //offset: 5
              },
              function(err, rows) {
                if (err) {
                  console.log(err);
                } else {
                  rows.forEach(element => {
                    if (element["robloxid"] == id) {
                      doc.addRow(
                        3,
                        {
                          Symbol: '="-" ',
                          Roblox_ID: element["robloxid"],
                          Stored_Username: element["storedusername"],
                          Update_date: moment().format("L"),
                          Update_Info: "Blacklist removed."
                        },
                        function(err) {
                          if (err) {
                            console.log(err);
                          }
                        }
                      );
                      element.del(function(err) {
                        if (err) {
                          message.channel.send("An error occured.");
                        } else {
                          message.channel.send(
                            "User successfully removed from the blacklist sheet."
                          );
                          var reason = [
                            "[1] Exploiters in and out of Vaktovia",
                            "[2] People committing real life illegal acts",
                            "[3] People abusing their power in Vaktovia",
                            "[4] Scammers",
                            "[5] Individuals whom are extremely against Vaktovia",
                            "[6] Alternative, shared, or purchased accounts"
                          ];
                          var reasonLoop = "";
                          var split = element["reason"].toString().split(",");
                          console.log(split);
                          for (var i = 0; i < split.length; i++) {
                            reasonLoop +=
                              reason[parseInt(split[i], 10) - 1] + "\n";
                          }

                          let VACDiscord = bot.guilds.get("411315317709602830");
                          let logChannel = VACDiscord.channels.get(
                            "718350351614607390"
                          );
                          logChannel.send(
                            "**" +
                              args[1] +
                              "** (Roblox ID: " +
                              element["robloxid"] +
                              ") has been removed from their blacklist: \n" +
                              "```" +
                              reasonLoop +
                              "```\n" +
                              "Ensure to notify <@693400459628511293> to verify this information before acceptance."
                          );

                          let VIADiscord = bot.guilds.get("485928637162455060");
                          let logChannel2 = VIADiscord.channels.get(
                            "485951274249093132"
                          );
                          logChannel2.send(
                            args[1] +
                              " | Blacklist removed. (Category " +
                              element["reason"] +
                              ")"
                          );
                        }
                      });
                    }
                  });
                }
              }
            );
            doc.getRows(
              2,
              {
                //offset: 5
              },
              function(err, rows) {
                if (err) {
                  console.log(err);
                } else {
                  rows.forEach(element => {
                    if (element["robloxid"] == id) {
                      doc.addRow(
                        3,
                        {
                          Symbol: '="-" ',
                          Roblox_ID: element["robloxid"],
                          Stored_Username: element["storedusername"],
                          Update_date: moment().format("L"),
                          Update_Info: "Suspension removed."
                        },
                        function(err) {
                          if (err) {
                            console.log(err);
                          }
                        }
                      );
                      element.del(function(err) {
                        if (err) {
                          message.channel.send("An error occured.");
                          console.log(err);
                          //message.channel.send(element["robloxid"]);
                        } else {
                          message.channel.send(
                            "User successfully removed from the suspension sheet."
                          );
                          let VACDiscord = bot.guilds.get("411315317709602830");
                          let logChannel = VACDiscord.channels.get(
                            "718350351614607390"
                          );
                          logChannel.send(
                            "**" +
                              args[1] +
                              "** (Roblox ID: " +
                              element["robloxid"] +
                              ")" +
                              " has been removed from their tier " +
                              element["tier"] +
                              " suspension. Ensure they're added to the <#413604217756975114> for one month upon acceptance."
                          );

                          let VIADiscord = bot.guilds.get("485928637162455060");
                          let logChannel2 = VIADiscord.channels.get(
                            "485951274249093132"
                          );
                          logChannel2.send(
                            args[1] +
                              " | Suspension expired. (Tier " +
                              element["tier"] +
                              ")"
                          );
                        }
                      });
                    }
                  });
                }
              }
            );
          });
        })
        .catch(err => {
          message.channel.send("This user was not found on Roblox.");
        });
      break;
    case "qb":
      if (
        !message.member.roles.get("485930041272827914") &&
        !message.member.roles.get("485929510492045332")
      ) {
        //411341455014100992
        console.log("role not found!");
        message.channel.send("You're not authorized to use this command.");
        break;
      }
      var mainMessage = args[1] + " has been blacklisted!";
      var addInfo = "";
      for (var i = 4; i < args.length; i++) {
        if (i == args.length - 1) {
          addInfo += args[i];
        } else {
          addInfo += args[i] + " ";
        }
      }
      console.log(addInfo);
      if (addInfo == "" || addInfo == undefined) {
        addInfo = "-";
      }
      var reasonList = args[2].split(",");
      var reasonLoop = "";
      var reason = [
        "[1] Exploiters in and out of Vaktovia",
        "[2] People committing real life illegal acts",
        "[3] People abusing their power in Vaktovia",
        "[4] Scammers",
        "[5] Individuals whom are extremely against Vaktovia",
        "[6] Alternative, shared, or purchased accounts"
      ];

      for (var i = 0; i < reasonList.length; i++) {
        reasonLoop += reason[reasonList[i] - 1] + "\n";
      }
      //username
      Roblox.getIdFromUsername(args[1]).then(id => {
        rID = id;
        var now = moment().format("L");

        var blacklistMessage = new Discord.RichEmbed() //embeded message to send back
          .setAuthor(
            "Command used by: " + message.author.username,
            message.author.avatarURL
          )
          .setTitle(mainMessage)
          .addField("Roblox ID", rID, true)
          .addField("Reason", reasonLoop)
          .addField("Additional Info", addInfo)
          .setColor("0x000000")
          .setThumbnail(
            "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
              rID
          )
          .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif") //'https://i.imgur.com/r2CVYa4.jpg' -- poseidon pfp
          .setTimestamp();
        var array = [args[1], id, "-", args[2], "-", addInfo];
        message.channel.send(blacklistMessage);
        findTest(true, true, array);
      });
      break;
    case "qs":
      if (
        !message.member.roles.get("485930041272827914") &&
        !message.member.roles.get("485929510492045332")
      ) {
        console.log("role not found!");
        message.channel.send("You're not authorized to use this command.");
        break;
      }
      var addInfo = "";
      for (var i = 2; i < args.length; i++) {
        if (i == args.length - 1) {
          addInfo += args[i];
        } else {
          addInfo += args[i] + " ";
        }
      }
      console.log(addInfo);
      if (addInfo == "" || addInfo == undefined) {
        addInfo = "-";
      }
      var now = moment().format("L");
      Roblox.getIdFromUsername(args[1]).then(id => {
        rID = id;
        var suspendMessage = new Discord.RichEmbed()
          .setAuthor(
            "Command used by: " + message.author.username,
            message.author.avatarURL
          )
          .setTitle(args[1] + " has been suspended!")
          .addField("Roblox ID", rID, true)
          .setThumbnail(
            "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
              rID
          )
          .setColor("0x000000")
          .addField("Reason: ", addInfo)
          .setFooter("Made by SenorMexico", "https://i.imgur.com/Mh0pMxb.gif");
        message.channel.send(suspendMessage);
        var list = [args[1], id, "-", "-", "-", addInfo, now];
        findTest(true, false, list);
      });
      break;
    case "note":
      Roblox.getIdFromUsername(args[1]).then(id => {
        var toDiscord = new Discord.RichEmbed()
          .setTitle(args[1] + " has been noted down.")
          .addField("Roblox ID", id)
          .setThumbnail(
            "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" + id
          )
          .setColor("#93c47d");
        message.channel.send(toDiscord);
        doc = new GoogleSpreadsheet(
          "1qqqBZ8qD1btguVx-VTQyx_Rgt5dtWyKW8-Y2tJSTb2c"
        );
        var now = moment().format("M/D/YYYY HH:mm:ss");
        doc2.useServiceAccountAuth(creds2, function(err) {
          doc2.addRow(
            2,
            {
              name: args[1],
              robloxid: id,
              date: now
            },
            function(err) {
              if (err) {
                console.log(err);
              }
            }
          );
        });
      });

      break;
    default:
      // default incase ![String] isn't a valid command
      message.channel.send("Invalid command");
  }
});

bot.login(config.token);

//-*****************************
//-*****************************
//-*****************************

//GOOGLE COMMANDS/SHEETS API

// Creates a document object with the sheets ID

// Adds a row with the information listed below
function findTest(isOn, isBlacklist, list) {
  //isBlacklist [true = blacklist, false = suspension], list = array with args
  if (isOn) {
    if (isBlacklist) {
      doc.useServiceAccountAuth(creds, function(err) {
        //stored_username id blacklisted_by reason evidence Additional_info, today
        // 0               1      2            3       4        5              6
        //adds row under the header of each and populates cells with info
        doc.addRow(
          1,
          {
            Roblox_ID: list[1],
            Blacklisted_by: list[2],
            Reason: list[3],
            Evidence: list[4],
            Additional_Information: list[5],
            Stored_Username: list[0]
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
        doc.addRow(
          3,
          {
            Symbol: '="+" ',
            Roblox_ID: list[1],
            Stored_Username: list[0],
            Update_date: list[6],
            Update_Info: "Blacklist logged."
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    } else {
      doc.useServiceAccountAuth(creds, function(err) {
        doc.addRow(
          2,
          {
            Roblox_ID: list[1],
            Suspended_by: list[2],
            Tier: list[3],
            Proof: list[4],
            Reason: list[5],
            Date_Suspended: list[6],
            Additional_Information: " ",
            Stored_Username: list[0]
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
        doc.addRow(
          3,
          {
            Symbol: '="+" ',
            Roblox_ID: list[1],
            Stored_Username: list[0],
            Update_date: list[6],
            Update_Info:
              "Suspension logged for Tier " + list[3] + ". " + list[5]
          },
          function(err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    }
  }
}
function transfer(anEvent) {
  return anEvent;
}

function getGrouos(id) {
  var idList = [
    [1181678, "The Imperial Insurgence"],
    [3048241, "Insurgent Ascension Program"],
    [5501000, "The Insurgent Ascension Program"],
    [5486470, "Imperium of Arcon"],
    [4105128, "𝐄jército Mexicano"]
  ];
  for (var i = 0; i < 5; i++) {
    Roblox.getRankInGroup(id, idList[0][i])
      .then(rank => {
        return idList[1][i] + " - " + rank;
      })
      .catch(err => {
        return "Not a good request";
      });
  }
}
