  <script>
        // JavaScript for handling modal visibility
        const buttons = document.querySelectorAll('.bottom-menu button');
        const modals = document.querySelectorAll('.modal-section');
        const closeButtons = document.querySelectorAll('.close');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const targetModal = document.getElementById(targetId);
                if (targetModal) {
                    targetModal.style.display = 'flex'; // Show the modal
                }
            });
        });

        closeButtons.forEach(closeButton => {
            closeButton.addEventListener('click', () => {
                const modalSection = closeButton.closest('.modal-section');
                modalSection.style.display = 'none'; // Hide the modal
            });
        });

        // Close modals when clicking outside of them
        window.addEventListener('click', (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none'; // Hide the modal
                }
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Load saved game data from Local Storage
            let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 0;
            let energy = localStorage.getItem('energy') ? parseInt(localStorage.getItem('energy')) : 1000; // Increased maximum energy
            const maxEnergy = 1000; // Increased maximum energy
            const energyLossPerClick = 10; // Energy loss per click
            const coinsText = document.getElementById('coins-text');
            const energyBar = document.getElementById('energy-bar');
            const energyText = document.getElementById('energy-text');
            const kittyCoin = document.getElementById('kitty-coin');
            const fullTankCost = 200;
            const multitapCost = 150;
            const energyLimitCost = 300;
            const rechargingSpeedCost = 250;
            let referralCode = localStorage.getItem('referralCode') || generateReferralCode();
            let referralReward = 1000; // Updated reward amount for the new user

            // Update UI with saved data
            function updateUI() {
                coinsText.textContent = `KittyCoins: ${coins}`;
                energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
                energyText.textContent = `Energy: ${Math.round((energy / maxEnergy) * 100)}%`;
                localStorage.setItem('coins', coins);
                localStorage.setItem('energy', energy);
                localStorage.setItem('referralCode', referralCode);
                adjustInputWidth();
            }

            // Handle kitty click event
            function handleKittyClick() {
                if (energy > 0) {
                    coins += 1; // Increase coins by 1 per click
                    energy -= energyLossPerClick; // Decrease energy
                    if (energy < 0) energy = 0;
                    updateUI();
                } else {
                    alert('Not enough energy!');
                }
            }

            // Handle button clicks in the Boost section
            document.getElementById('full-tank').addEventListener('click', function() {
                if (coins >= fullTankCost) {
                    energy = maxEnergy;
                    coins -= fullTankCost;
                    updateUI();
                    document.getElementById('improvement-message').textContent = `Full Tank activated!`;
                } else {
                    document.getElementById('improvement-message').textContent = `Not enough coins to activate Full Tank!`;
                }
            });

            document.getElementById('multitap').addEventListener('click', function() {
                if (coins >= multitapCost) {
                    coins -= multitapCost;
                    updateUI();
                    document.getElementById('improvement-message').textContent = `Multitap activated!`;
                } else {
                    document.getElementById('improvement-message').textContent = `Not enough coins to activate Multitap!`;
                }
            });

            document.getElementById('energy-limit').addEventListener('click', function() {
                if (coins >= energyLimitCost) {
                    maxEnergy += 100; // Increase energy limit
                    coins -= energyLimitCost;
                    updateUI();
                    document.getElementById('improvement-message').textContent = `Energy limit increased!`;
                } else {
                    document.getElementById('improvement-message').textContent = `Not enough coins to increase Energy Limit!`;
                }
            });

            document.getElementById('recharging-speed').addEventListener('click', function() {
                if (coins >= rechargingSpeedCost) {
                    coins -= rechargingSpeedCost;
                    updateUI();
                    document.getElementById('improvement-message').textContent = `Recharging speed improved!`;
                } else {
                    document.getElementById('improvement-message').textContent = `Not enough coins to improve Recharging Speed!`;
                }
            });

            // Referral code handling
            const referralCodeInput = document.getElementById('referral-code');
            const applyReferralButton = document.getElementById('apply-referral');
            const referralMessage = document.getElementById('referral-message');
            const referralCodeDisplay = document.getElementById('referral-code-display');
            const copyCodeButton = document.getElementById('copy-code');
            const shareLink = document.getElementById('share-link');
            const copyLinkButton = document.getElementById('copy-link');

            function generateReferralCode() {
                return Math.random().toString(36).substring(2, 8).toUpperCase();
            }

            function updateReferralCode() {
                referralCodeDisplay.value = referralCode;
                adjustInputWidth(); // Adjust input width to match referral code length
            }

            function adjustInputWidth() {
                // Set input width to a fixed value
                referralCodeDisplay.style.width = '200px';
                referralCodeInput.style.width = '200px'; // Set the same width for input
            }

            function applyReferralCode(code) {
                // Add logic to reward coins for valid referral codes
                if (code === referralCode) {
                    coins += referralReward; // Reward amount for the new user
                    localStorage.setItem('coins', coins);
                    updateUI();
                    return true;
                }
                return false;
            }

            applyReferralButton.addEventListener('click', function() {
                const enteredCode = referralCodeInput.value.trim().toUpperCase();
                if (enteredCode) {
                    const success = applyReferralCode(enteredCode);
                    if (success) {
                        referralMessage.textContent = `Referral code applied! You have earned ${referralReward} KittyCoins.`;
                    } else {
                        referralMessage.textContent = `Invalid referral code. Please try again.`;
                    }
                } else {
                    referralMessage.textContent = `Please enter a valid referral code.`;
                }
            });

            copyCodeButton.addEventListener('click', function() {
                referralCodeDisplay.select();
                document.execCommand('copy');
                // Remove the alert message
                // alert('Referral code copied to clipboard!');
            });

            copyLinkButton.addEventListener('click', function() {
                shareLink.select();
                document.execCommand('copy');
                // Optionally remove the alert message
                // alert('Referral link copied to clipboard!');
            });

            // Initial update of the UI
            updateReferralCode();
            updateUI();
        });
    </script>
  </body>
  
</html>

<script>




document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація облікових даних
    const accountId = localStorage.getItem('accountId') || generateUniqueId();
    localStorage.setItem('accountId', accountId);

    let coins = parseInt(localStorage.getItem(`${accountId}_coins`)) || 0;
    let energy = parseInt(localStorage.getItem(`${accountId}_energy`)) || 1000;
    let energyLimit = parseInt(localStorage.getItem(`${accountId}_energyLimit`)) || 1000;
    const energyCostPerClick = 5;

    const coinsText = document.getElementById('coins-text');
    const energyBar = document.getElementById('energy-bar');
    const energyText = document.getElementById('energy-text');
    const kittyCoin = document.getElementById('kitty-coin');
    const fullTankButton = document.getElementById('full-tank');

    let clickUpgradeMultiplier = parseInt(localStorage.getItem(`${accountId}_clickUpgradeMultiplier`)) || 1;
    let multitapClicks = parseInt(localStorage.getItem(`${accountId}_multitapClicks`)) || 1;
    let rechargingSpeed = parseInt(localStorage.getItem(`${accountId}_rechargingSpeed`)) || 5;
    let fullTankUsageCount = parseInt(localStorage.getItem(`${accountId}_fullTankUsageCount`)) || 0;
    const maxFullTankUsage = 6;
    let lastFullTankResetTime = new Date(localStorage.getItem(`${accountId}_lastFullTankResetTime`)) || new Date();

    let multitapCost = parseInt(localStorage.getItem(`${accountId}_multitapCost`)) || 150;
    let energyLimitCost = parseInt(localStorage.getItem(`${accountId}_energyLimitCost`)) || 300;
    let rechargingSpeedCost = parseInt(localStorage.getItem(`${accountId}_rechargingSpeedCost`)) || 250;

    let multitapLevel = parseInt(localStorage.getItem(`${accountId}_multitapLevel`)) || 0;
    let energyLimitLevel = parseInt(localStorage.getItem(`${accountId}_energyLimitLevel`)) || 0;
    let rechargingSpeedLevel = parseInt(localStorage.getItem(`${accountId}_rechargingSpeedLevel`)) || 0;

    // Реферальний механізм
    let referralCode = localStorage.getItem(`${accountId}_referralCode`) || generateReferralCode();
    const referralReward = 1000; // Сума винагороди за реферальний код
    const referralCodeInput = document.getElementById('referral-code');
    const applyReferralButton = document.getElementById('apply-referral');
    const referralMessage = document.getElementById('referral-message');
    const referralCodeDisplay = document.getElementById('referral-code-display');
    const copyCodeButton = document.getElementById('copy-code');

    // Перевіряє, чи код вже був використаний цим користувачем
    let usedReferralCodes = JSON.parse(localStorage.getItem(`${accountId}_usedReferralCodes`)) || [];
    // Зберігає коди, використані іншими акаунтами
    let usedReferralCodesByOthers = JSON.parse(localStorage.getItem(`${accountId}_usedReferralCodesByOthers`)) || [];

    function generateReferralCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    function applyReferralCode(code) {
        // Перевірка на використання власного реферального коду
        if (code === referralCode) {
            referralMessage.textContent = `You cannot use your own referral code.`;
            return false;
        }

        // Перевірка, чи код вже був використаний цим акаунтом або іншими акаунтами
        if (usedReferralCodes.includes(code) || usedReferralCodesByOthers.includes(code)) {
            referralMessage.textContent = `Referral code already used.`;
            return false;
        }

        // Перевірка на дійсність коду
        if (code.length === 6) {
            coins += referralReward;
            localStorage.setItem(`${accountId}_coins`, coins);
            usedReferralCodes.push(code);
            localStorage.setItem(`${accountId}_usedReferralCodes`, JSON.stringify(usedReferralCodes));
            usedReferralCodesByOthers.push(code);
            localStorage.setItem(`${accountId}_usedReferralCodesByOthers`, JSON.stringify(usedReferralCodesByOthers));
            return true;
        }
        return false;
    }

    function updateReferralCode() {
        referralCodeDisplay.value = referralCode;
    }

    applyReferralButton.addEventListener('click', function() {
        const enteredCode = referralCodeInput.value.trim().toUpperCase();
        if (enteredCode) {
            const success = applyReferralCode(enteredCode);
            if (success) {
                referralMessage.textContent = `Referral code applied! You have earned ${referralReward} KittyCoins.`;
                updateUI(); // Оновити UI після застосування коду
            } else {
                referralMessage.textContent = `Invalid referral code. Please try again.`;
            }
        } else {
            referralMessage.textContent = `Please enter a valid referral code.`;
        }
    });

    copyCodeButton.addEventListener('click', function() {
        referralCodeDisplay.select();
        document.execCommand('copy');
    });

    function updateEnergyLimit() {
        energyLimit = 1000 + (energyLimitLevel * 200);
    }

    function updateRechargingSpeed() {
        rechargingSpeed = rechargingSpeedLevel + 1;
    }

    function updateMultitapClicks() {
        multitapClicks = multitapLevel + 1;
    }

    function handleKittyClick() {
        if (energy >= energyCostPerClick) {
            energy -= energyCostPerClick;
            const totalClicks = multitapClicks;
            for (let i = 0; i < totalClicks; i++) {
                coins += clickUpgradeMultiplier;
            }
            energy = Math.min(energy, energyLimit);
            updateUI();
            kittyCoin.classList.add('zoomed');
            setTimeout(() => kittyCoin.classList.remove('zoomed'), 300);
            saveGameData();
        } else {
            showMessage("Not enough energy!");
        }
    }

    function showMessage(message) {
        document.getElementById('improvement-message').textContent = message;
    }

    function useFullTank() {
        const now = new Date();
        if (now - lastFullTankResetTime >= 24 * 60 * 60 * 1000) {
            fullTankUsageCount = 0;
            lastFullTankResetTime = now;
        }

        if (fullTankUsageCount < maxFullTankUsage) {
            energy = energyLimit;
            fullTankUsageCount++;
            updateUI();
            saveGameData();
        } else {
            showMessage("You have reached the daily limit of Full Tanks!");
        }
    }

    function updateFullTankButton() {
        const now = new Date();
        const timeElapsed = now - lastFullTankResetTime;
        const timeRemaining = Math.max(0, 24 * 60 * 60 * 1000 - timeElapsed);
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const timerText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (energy >= energyLimit) {
            if (fullTankUsageCount >= maxFullTankUsage) {
                fullTankButton.textContent = `Full Tank (Cooldown: ${timerText})`;
                fullTankButton.disabled = true;
            } else {
                fullTankButton.textContent = `Full Tank (Uses left: ${maxFullTankUsage - fullTankUsageCount})`;
                fullTankButton.disabled = false;
            }
        } else {
            fullTankButton.textContent = `Full Tank (Cooldown: ${timerText})`;
            fullTankButton.disabled = true;
        }
    }

    function checkFullTankCooldown() {
        const now = new Date();
        const timeElapsed = now - lastFullTankResetTime;
        if (timeElapsed >= 24 * 60 * 60 * 1000) {
            // Відновлення лічильника використання та часу
            fullTankUsageCount = 0;
            lastFullTankResetTime = now;
            saveGameData();
        }
        updateFullTankButton();
    }

    function updateUI() {
        updateEnergyLimit();
        updateRechargingSpeed();
        updateMultitapClicks();
        checkFullTankCooldown();

        coinsText.textContent = `KittyCoins: ${coins}`;
        energyBar.style.width = `${(energy / energyLimit) * 100}%`;
        energyText.textContent = `Energy: ${energy}/${energyLimit}`;

        document.getElementById('multitap').innerText = `Multitap (Level ${multitapLevel}) - ${multitapCost} Coins`;
        document.getElementById('energy-limit').innerText = `Energy Limit (Level ${energyLimitLevel}) - ${energyLimitCost} Coins`;
        document.getElementById('recharging-speed').innerText = `Recharging Speed (Level ${rechargingSpeedLevel}) - ${rechargingSpeedCost} Coins`;
        document.getElementById('improvement-message').textContent = '';

        updateReferralCode(); // Оновлює реферальний код в UI
    }

    function regenerateEnergy() {
        if (energy < energyLimit) {
            energy += rechargingSpeed;
            energy = Math.min(energy, energyLimit);
            updateUI();
        }
    }

    function saveGameData() {
        localStorage.setItem(`${accountId}_coins`, coins);
        localStorage.setItem(`${accountId}_energy`, energy);
        localStorage.setItem(`${accountId}_clickUpgradeMultiplier`, clickUpgradeMultiplier);
        localStorage.setItem(`${accountId}_multitapClicks`, multitapClicks);
        localStorage.setItem(`${accountId}_energyLimit`, energyLimit);
        localStorage.setItem(`${accountId}_rechargingSpeed`, rechargingSpeed);
        localStorage.setItem(`${accountId}_multitapCost`, multitapCost);
        localStorage.setItem(`${accountId}_energyLimitCost`, energyLimitCost);
        localStorage.setItem(`${accountId}_rechargingSpeedCost`, rechargingSpeedCost);
        localStorage.setItem(`${accountId}_multitapLevel`, multitapLevel);
        localStorage.setItem(`${accountId}_energyLimitLevel`, energyLimitLevel);
        localStorage.setItem(`${accountId}_rechargingSpeedLevel`, rechargingSpeedLevel);
        localStorage.setItem(`${accountId}_fullTankUsageCount`, fullTankUsageCount);
        localStorage.setItem(`${accountId}_lastFullTankResetTime`, lastFullTankResetTime.toISOString());
        localStorage.setItem(`${accountId}_referralCode`, referralCode); // Зберігає реферальний код
        localStorage.setItem(`${accountId}_usedReferralCodes`, JSON.stringify(usedReferralCodes)); // Зберігає використані реферальні коди
        localStorage.setItem(`${accountId}_usedReferralCodesByOthers`, JSON.stringify(usedReferralCodesByOthers)); // Зберігає використані реферальні коди іншими акаунтами
    }

    function buyImprovement(improvement) {
        let cost;
        switch (improvement) {
            case 'multitap':
                cost = multitapCost;
                if (coins >= cost) {
                    coins -= cost;
                    multitapLevel++;
                    updateMultitapClicks();
                    multitapCost *= 2;
                } else {
                    showMessage("Not enough coins!");
                }
                break;
            case 'energy-limit':
                cost = energyLimitCost;
                if (coins >= cost) {
                    coins -= cost;
                    energyLimitLevel++;
                    energyLimitCost *= 2;
                } else {
                    showMessage("Not enough coins!");
                          return [
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)]
        ];
    }

    // Функція для створення ключових кадрів для анімації
    function createAnimation(color1, color2, color3, color4) {
        return `
            @keyframes colorChange${animationCount} {
                0% {
                    color: ${color1};
                }
                25% {
                    color: ${color2};
                }
                50% {
                    color: ${color3};
                }
                75% {
                    color: ${color4};
                }
                100% {
                    color: ${color1};
                }
            }
        `;
    }

    // Додаємо стилі для анімацій у <style> елемент
    const style = document.createElement('style');
    document.head.appendChild(style);

    // Розбиваємо текст на окремі букви і додаємо стилі
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            const [color1, color2, color3, color4] = getRandomColors();
            style.sheet.insertRule(createAnimation(color1, color2, color3, color4), style.sheet.cssRules.length);

            coloredText += `<span class="letter" style="animation: colorChange${animationCount} 5s linear infinite;">${text[i]}</span>`;
            animationCount++;
        } else {
            coloredText += ' ';
        }
    }

    textElement.innerHTML = coloredText;
});

const codeEditor = document.querySelector('replit-code-editor');
if (codeEditor) {
  const textarea = codeEditor.shadowRoot.querySelector('textarea');
  if (textarea) {
    textarea.value += codeToInsert;
  } else {
    console.error("Textarea not found in code editor.");
  }
} else {
  console.error("Code editor not found.");
}

  



</script>
 
