const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a jar with a glowing green substance inside beside you.',
    options: [
      {
        text: 'Take the jar',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the jar',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the jar for a sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the jar for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the jar of green substance at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar at the monster and it exploded. After the dust settled you spot a key in the corner of the room.',
    options: [
      {
        text: 'Pick up the key',
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: 'You see a door at end of the room and decide to open it. It leads to a large hallway where two grand staircases stood,leading down to two doors. you only have one key and have to pick one door.',
    options: [
      {
        text: 'Open door 1',
        nextText: 13
      },
      {
        text: 'Open door 2',
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: 'On a dimly lit table in the middle of the room you see a sword and another key, the sword glistened and upon closer inspection and had a name engraved on it. It read "King Francis III',
    options: [
      {
        text: 'Take the sword and explore door two',
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: 'Door two leads to a dungeon where a knight in full armour stands guard. He instantly slays you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 15,
    text: 'Door two leads to a dungeon where knight in full armour stands guard. With your new sword in hand you feel confident enough to enter into battle.',
    options: [
      {
        text: 'Strike his chest',
        nextText: 16
      },
      {
        text: "Strike his legs",
        nextText: 17
      }
    ]
  },
  {
    id: 16,
    text: 'Your sword is no match for his chestplate, he strikes you with his sword and kills you.',
    options: [
    {
    text: 'Try again',
    nextText: 13
    }
    ]
  },
  {
    id: 17,
    text: "The armour on his legs was weak and your sword pierces through, he falls to the floor.",
    options: [
      {
        text: 'Explore the dungeon further',
        nextText: 18
      },
      {
        text: 'Turn back and explore the castle upstairs',
        nextText: 19
      }
    ]

  },
  {
    id: 18,
    text: "You get lost in the dungeon and get overrun by guards",
    options:[
      {
        text: 'Try again',
        nextText: 16
      }
    ]
  },
  {
    id: 19,
    text: "You see a large doorway glistening in the dim light and decide to open it. Inside sits King Francis III, whos sword you have in your hand. He tells you to surrender his sword at once",
    options:[
      {
        text: 'Refuse and strike him in his chest',
        nextText: 21
      },
      {
        text: 'Surrender his sword in fear',
        nextText: 20
      }
    ]
  },
  {
    id: 20,
    text: "You surrender his sword and now you are unarmed. The king captures you and sends you to the dungeon where you will spend the rest of your days.",
    options:[
      {
        text: 'Try again',
        nextText: -1
      }
    ]
  },
  {
    id: 21,
    text: "Your strike the king with might and he falls to the floor. You claim his crown therefor making you the new king. Congratulations",
    options:[
      {
        text: 'Play again',
        nextText: -1
      }
    ]
  },
  
]

startGame()