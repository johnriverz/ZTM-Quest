import { displayDialogue } from "../../utils";

// src/interactions/map_start/something.interaction.js
export const interactionWithGameMachine3 = (player, k, map) => {
    player.onCollide('game_machine_3', () => {
        // trigger
        player.isInDialog = true;

        // trigger prompt when player collides with game machine
        showCustomPrompt(
            "Play game?", 
            ["Yes", "No"],
            (selection) => {
                // do something based on player choice
                if (selection == 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ["Starting game, glhf!"],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startGame(k);
                        },
                    });
                } 
                else {
                    displayDialogue({
                        k,
                        player, 
                        text: ['Goodbye!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }    
            }
        );
    });
};

function showCustomPrompt(msg, options, callback) {
    // set prompt msg
    document.getElementById('prompt-message').textContent = msg;

    // clear container 
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // makes button focusable

        // add click event for mouse interaction
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        }; 

        // add keyboard event listener for accessibility
        button.addEventListener('keydown', function (e) {
            if (e.key == "Enter" || e.key == " ") {
                e.preventDefault();
                callback(option);
                closeCustomPrompt();
            }
        });
        optionsContainer.appendChild(button);
    });

    // custom prompt
    document.getElementById('custom-prompt').style.display = "flex";

    // focus on first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

function closeCustomPrompt() {
    document.getElementById("custom-prompt").style.display = 'none'
}

function startGame(player, k, map) {
    
}