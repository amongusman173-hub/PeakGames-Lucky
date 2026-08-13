let balance = 1000.00;
let currentGame = 'dice';
let currentStatsGame = 'dice'; // Track which game's stats are being displayed

// Achievements system
let achievements = {
    firstWin: false,
    bigWin: false,
    jackpot: false,
    millionaire: false,
    gambler: false,
    luckyStreak: false,
    caseCollector: false,
    highRoller: false,
    perfectTower: false,
    kenoMaster: false,
    scratchWinner: false,
    blackjackPro: false,
    limboLegend: false,
    slotsMaster: false,
    musicCollector: false,
    upgradeKing: false,
    comebackKid: false,
    riskTaker: false
};

let achievementStats = {
    totalWins: 0,
    biggestWin: 0,
    totalGamesPlayed: 0,
    casesOpened: 0,
    consecutiveWins: 0,
    maxBalance: 1000,
    scratchWins: 0,
    blackjackWins: 0,
    limboHighest: 0,
    slotsJackpots: 0,
    tracksOwned: 0,
    upgradesPurchased: 0,
    comebackAmount: 0
};

let minesGameActive = false;
let minesRevealed = 0;
let minePositions = [];

// Upgrades system
let upgrades = {
    minesReveal: 0,
    minesShield: 0,
    stocksInsider: 0,
    plinkoLuck: 0,
    plinkoMagnet: 0,
    diceBoost: 0,
    dicePerfect: 0,
    stocksForceUp: 0,
    crashSafety: 0,
    crashMoon: 0,
    limboBoost: 0,
    limboPrecision: 0,
    rouletteVision: 0,
    rouletteMagnet: 0,
    slotsLuck: 0,
    slotsDiamond: 0,
    blackjackPeek: 0,
    blackjackCounter: 0,
    towerShield: 0,
    towerVision: 0,
    kenoOracle: 0,
    kenoMaster: 0,
    coinBias: 0,
    coinLucky: 0,
    casesLuck: 0,
    casesRare: 0,
    scratchGolden: 0,
    scratchReveal: 0,
    packsBoost: 0,
    packsLegendary: 0,
    pumpSafety: 0,
    pumpGreed: 0,
    drillLuck: 0,
    drillVision: 0,
    diamondsMatch: 0,
    diamondsRare: 0,
    dartsAim: 0,
    dartsBullseye: 0,
    chickenSafety: 0,
    chickenGreed: 0,
    hiloOracle: 0,
    hiloStreak: 0,
    tarotFortune: 0,
    tarotVision: 0,
    snakesLadder: 0,
    snakesLuck: 0,
    baccaratVision: 0,
    baccaratLuck: 0,
    videopokerLuck: 0,
    videopokerVision: 0,
    rpsLuck: 0,
    rpsPsychic: 0
};

const upgradePrices = {
    minesReveal: 200,
    minesShield: 250,
    stocksInsider: 300,
    plinkoLuck: 250,
    plinkoMagnet: 300,
    diceBoost: 150,
    dicePerfect: 200,
    stocksForceUp: 400,
    crashSafety: 350,
    crashMoon: 400,
    limboBoost: 200,
    limboPrecision: 250,
    rouletteVision: 500,
    rouletteMagnet: 450,
    slotsLuck: 300,
    slotsDiamond: 350,
    blackjackPeek: 400,
    blackjackCounter: 350,
    towerShield: 350,
    towerVision: 400,
    kenoOracle: 250,
    kenoMaster: 300,
    coinBias: 200,
    coinLucky: 250,
    casesLuck: 200,
    casesRare: 300,
    scratchGolden: 250,
    scratchReveal: 300,
    packsBoost: 200,
    packsLegendary: 350,
    pumpSafety: 250,
    pumpGreed: 300,
    drillLuck: 250,
    drillVision: 300,
    diamondsMatch: 200,
    diamondsRare: 250,
    dartsAim: 200,
    dartsBullseye: 300,
    chickenSafety: 250,
    chickenGreed: 300,
    hiloOracle: 250,
    hiloStreak: 300,
    tarotFortune: 250,
    tarotVision: 300,
    snakesLadder: 250,
    snakesLuck: 300,
    baccaratVision: 300,
    baccaratLuck: 250,
    videopokerLuck: 250,
    videopokerVision: 300,
    rpsLuck: 200,
    rpsPsychic: 300
};

// Sound system
const sounds = {
    buttonClick: new Audio('sounds/button_click.mp3'),
    coinFlip: new Audio('sounds/coin_flip.mp3'),
    mineLose: new Audio('sounds/mine_loose.mp3'),
    mineDiamond: new Audio('sounds/mine_diamond.mp3'),
    gameSwitch: new Audio('sounds/game_switch.mp3'),
    cashPayoutSmall: new Audio('sounds/cash_payout_small.mp3'),
    cashPayoutMedium: new Audio('sounds/cash_payout_medium.mp3'),
    cashPayoutLarge: new Audio('sounds/cash_payout_large.mp3'),
    blackjackCardFlip: new Audio('sounds/blackjack_card_flip.mp3'),
    diceWin: new Audio('sounds/dice_win.mp3'),
    lose: new Audio('sounds/loose.mp3'),
    rouletteSpin: new Audio('sounds/Roulette_spin.mp3'),
    kenoSelect: new Audio('sounds/keno_select.mp3'),
    towerWin: new Audio('sounds/tower_win.mp3'),
    slotsSpin: new Audio('sounds/slots_spin.mp3'),
    ding: new Audio('sounds/ding.mp3'),
    jackpot: new Audio('sounds/JACKPOT!!!.mp3'),
    scratchTicket: new Audio('sounds/scratch_ticket_scratch.mp3'),
    caseUnbox: new Audio('sounds/case_unbox.mp3'),
    openShop: new Audio('sounds/open_shop.ogg'),
    stocksBuy: new Audio('sounds/stocks_buy.mp3'),
    shopBuy: new Audio('sounds/shop_buy.ogg'),
    pumpPump: new Audio('sounds/pump_pump.mp3'),
    pumpPop: new Audio('sounds/pump_pop.mp3'),
    chickenLoose: new Audio('sounds/chicken_loose.mp3'),
    dartsThrow: new Audio('sounds/darts_throw.mp3'),
    diamondsEach: new Audio('sounds/diamonds_each_diamond.mp3')
};

// Preload sounds
Object.values(sounds).forEach(sound => {
    sound.preload = 'auto';
    sound.volume = 0.5;
});

// Set cashout sounds to lower volume
sounds.cashPayoutSmall.volume = 0.25;
sounds.cashPayoutMedium.volume = 0.3;
sounds.cashPayoutLarge.volume = 0.35;

// Set card flip to lower volume
sounds.blackjackCardFlip.volume = 0.3;

function playSound(soundName) {
    if (sounds[soundName]) {
        // Clone the audio to allow overlapping sounds
        const soundClone = sounds[soundName].cloneNode();
        soundClone.volume = sounds[soundName].volume;
        soundClone.play().catch(e => console.log('Sound play failed:', e));
    }
}

function playWinSound(winAmount) {
    if (winAmount >= 500) {
        playSound('cashPayoutLarge');
    } else if (winAmount >= 100) {
        playSound('cashPayoutMedium');
    } else if (winAmount > 0) {
        playSound('cashPayoutSmall');
    }
}

// Music system
let musicEnabled = false;
let currentTrack = null;
let ownedTracks = [];
const trackPrices = {
    1: 50,
    2: 75,
    3: 100,
    4: 150,
    5: 200,
    6: 250,
    7: 300,
    777: 777
};

const musicTracks = {
    1: new Audio('sounds/Track_1.mp3'),
    2: new Audio('sounds/track_2.mp3'),
    3: new Audio('sounds/track_3.mp3'),
    4: new Audio('sounds/track_4.mp3'),
    5: new Audio('sounds/track_5.mp3'),
    6: new Audio('sounds/track_6.ogg'),
    7: new Audio('sounds/track_Choral_Chambers_track7.mp3'),
    777: new Audio('sounds/admiring_you.ogg')
};

const jackpotTrack = new Audio('sounds/777jackpot.ogg');

// Setup music tracks
Object.values(musicTracks).forEach(track => {
    track.loop = true;
    track.volume = 0.3;
});

function toggleMusic() {
    musicEnabled = !musicEnabled;
    const btn = document.getElementById('music-toggle');
    
    if (musicEnabled) {
        btn.textContent = '🎵 Music: ON';
        btn.classList.add('active');
        if (currentTrack && ownedTracks.includes(currentTrack)) {
            musicTracks[currentTrack].play().catch(e => console.log('Music play failed:', e));
        }
    } else {
        btn.textContent = '🎵 Music: OFF';
        btn.classList.remove('active');
        Object.values(musicTracks).forEach(track => track.pause());
    }
}

function openShop() {
    playSound('openShop');
    document.getElementById('shop-modal').classList.add('active');
    updateShopDisplay();
}

function closeShop() {
    document.getElementById('shop-modal').classList.remove('active');
}

// Achievements functions
function openAchievements() {
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.classList.add('active');
        updateAchievementsDisplay();
    }
}

function closeAchievements() {
    document.getElementById('achievements-modal').classList.remove('active');
}

// Changelog functions
function openChangelog() {
    document.getElementById('changelog-modal').classList.add('active');
}

function closeChangelog() {
    document.getElementById('changelog-modal').classList.remove('active');
}

function updateAchievementsDisplay() {
    for (const [key, unlocked] of Object.entries(achievements)) {
        const card = document.getElementById(`ach-${key}`);
        if (card) {
            const status = card.querySelector('.achievement-status');
            if (unlocked) {
                card.classList.add('unlocked');
                status.textContent = '✅';
            } else {
                card.classList.remove('unlocked');
                status.textContent = '🔒';
            }
        }
    }
}

function checkAchievement(type, value) {
    let unlocked = false;
    
    switch(type) {
        case 'firstWin':
            if (!achievements.firstWin && achievementStats.totalWins >= 1) {
                achievements.firstWin = true;
                unlocked = true;
            }
            break;
        case 'bigWin':
            if (!achievements.bigWin && value >= 500) {
                achievements.bigWin = true;
                achievementStats.biggestWin = Math.max(achievementStats.biggestWin, value);
                unlocked = true;
            }
            break;
        case 'jackpot':
            if (!achievements.jackpot && value >= 100) {
                achievements.jackpot = true;
                unlocked = true;
            }
            break;
        case 'millionaire':
            if (!achievements.millionaire && balance >= 10000) {
                achievements.millionaire = true;
                unlocked = true;
            }
            break;
        case 'gambler':
            if (!achievements.gambler && achievementStats.totalGamesPlayed >= 100) {
                achievements.gambler = true;
                unlocked = true;
            }
            break;
        case 'luckyStreak':
            if (!achievements.luckyStreak && achievementStats.consecutiveWins >= 5) {
                achievements.luckyStreak = true;
                unlocked = true;
            }
            break;
        case 'caseCollector':
            if (!achievements.caseCollector && achievementStats.casesOpened >= 50) {
                achievements.caseCollector = true;
                unlocked = true;
            }
            break;
        case 'highRoller':
            if (!achievements.highRoller && value >= 1000) {
                achievements.highRoller = true;
                unlocked = true;
            }
            break;
        case 'perfectTower':
            if (!achievements.perfectTower) {
                achievements.perfectTower = true;
                unlocked = true;
            }
            break;
        case 'kenoMaster':
            if (!achievements.kenoMaster) {
                achievements.kenoMaster = true;
                unlocked = true;
            }
            break;
        case 'scratchWinner':
            if (!achievements.scratchWinner && achievementStats.scratchWins >= 10) {
                achievements.scratchWinner = true;
                unlocked = true;
            }
            break;
        case 'blackjackPro':
            if (!achievements.blackjackPro && achievementStats.blackjackWins >= 20) {
                achievements.blackjackPro = true;
                unlocked = true;
            }
            break;
        case 'limboLegend':
            if (!achievements.limboLegend && achievementStats.limboHighest >= 50) {
                achievements.limboLegend = true;
                unlocked = true;
            }
            break;
        case 'slotsMaster':
            if (!achievements.slotsMaster && achievementStats.slotsJackpots >= 15) {
                achievements.slotsMaster = true;
                unlocked = true;
            }
            break;
        case 'musicCollector':
            if (!achievements.musicCollector && achievementStats.tracksOwned >= 5) {
                achievements.musicCollector = true;
                unlocked = true;
            }
            break;
        case 'upgradeKing':
            if (!achievements.upgradeKing && achievementStats.upgradesPurchased >= 10) {
                achievements.upgradeKing = true;
                unlocked = true;
            }
            break;
        case 'comebackKid':
            if (!achievements.comebackKid && achievementStats.comebackAmount >= 500) {
                achievements.comebackKid = true;
                unlocked = true;
            }
            break;
        case 'riskTaker':
            if (!achievements.riskTaker && value >= 500) {
                achievements.riskTaker = true;
                unlocked = true;
            }
            break;
    }
    
    if (unlocked) {
        showToast(`🏆 Achievement Unlocked: ${type}!`, 'success');
        createConfetti();
    }
}

function trackGamePlayed(betAmount) {
    achievementStats.totalGamesPlayed++;
    checkAchievement('gambler');
    checkAchievement('highRoller', betAmount);
    checkAchievement('riskTaker', betAmount);
}

function trackWin(winAmount, multiplier) {
    achievementStats.totalWins++;
    achievementStats.consecutiveWins++;
    
    const profit = winAmount;
    checkAchievement('firstWin');
    checkAchievement('bigWin', profit);
    checkAchievement('jackpot', multiplier);
    checkAchievement('luckyStreak');
}

function trackLoss() {
    achievementStats.consecutiveWins = 0;
}

function updateShopDisplay() {
    const trackSelect = document.getElementById('track-select');
    
    // Update shop items
    document.querySelectorAll('.shop-item').forEach(item => {
        const trackNum = parseInt(item.dataset.track);
        const statusEl = item.querySelector('.track-status');
        const buyBtn = item.querySelector('.buy-btn');
        
        if (ownedTracks.includes(trackNum)) {
            item.classList.add('owned');
            statusEl.textContent = '✓ Owned';
            statusEl.classList.remove('locked');
            statusEl.classList.add('owned');
            buyBtn.disabled = true;
            buyBtn.textContent = 'Owned';
        }
    });
    
    // Update track selector
    trackSelect.innerHTML = '<option value="none">No Music</option>';
    ownedTracks.forEach(trackNum => {
        const option = document.createElement('option');
        option.value = trackNum;
        const trackNames = {
            1: 'Chill Vibes',
            2: 'Lofi Dreams',
            3: 'Midnight Groove',
            4: 'Sunset Waves',
            5: 'Casino Royale',
            6: 'Hotel Lobby',
            7: 'Choral Chambers',
            777: 'Admiring You (Legendary)'
        };
        option.textContent = trackNames[trackNum];
        if (currentTrack === trackNum) {
            option.selected = true;
        }
        trackSelect.appendChild(option);
    });
}

function buyTrack(trackNum) {
    const price = trackPrices[trackNum];
    
    if (balance < price) {
        showToast('Not enough balance!', 'error');
        return;
    }
    
    if (ownedTracks.includes(trackNum)) {
        showToast('Already owned!', 'error');
        return;
    }
    
    balance -= price;
    updateBalance();
    playSound('shopBuy');
    ownedTracks.push(trackNum);
    
    // Track music purchases
    achievementStats.tracksOwned = ownedTracks.length;
    checkAchievement('musicCollector');
    
    // Show music button on first purchase
    if (ownedTracks.length === 1) {
        document.getElementById('music-toggle').style.display = 'block';
        document.getElementById('music-selector-container').style.display = 'block';
    }
    
    // Update music dropdown
    const musicSelect = document.getElementById('music-track-select');
    musicSelect.innerHTML = '<option value="none">No Music</option>';
    ownedTracks.forEach(trackNum => {
        const option = document.createElement('option');
        option.value = trackNum;
        const trackNames = {
            1: 'Chill Vibes',
            2: 'Lofi Dreams',
            3: 'Midnight Groove',
            4: 'Sunset Waves',
            5: 'Casino Royale',
            6: 'Hotel Lobby',
            7: 'Choral Chambers',
            777: 'Admiring You (Legendary)'
        };
        option.textContent = trackNames[trackNum];
        if (currentTrack === trackNum) {
            option.selected = true;
        }
        musicSelect.appendChild(option);
    });
    
    showToast(`Purchased Track ${trackNum}!`, 'success');
    
    // Play preview of track 777 when purchased
    if (trackNum === 777) {
const track777 = jackpotTrack.cloneNode();
        const currentMusic = currentTrack ? musicTracks[currentTrack] : null;
        const originalVolume = currentMusic ? currentMusic.volume : 0;
        
        if (currentMusic && !currentMusic.paused) {
            currentMusic.pause();
        }
        
        track777.pause();
        track777.currentTime = Math.random() * Math.max(0, track777.duration - 5) || Math.random() * 120;
        track777.volume = 0;
        track777.play().catch(e => console.log('777 preview failed:', e));
        
        // Fade in
        let fadeIn = setInterval(() => {
            if (track777.volume < 0.45) {
                track777.volume += 0.05;
            } else {
                track777.volume = 0.5;
                clearInterval(fadeIn);
            }
        }, 50);
        
        setTimeout(() => {
            // Fade out
            let fadeOut = setInterval(() => {
                if (track777.volume > 0.05) {
                    track777.volume -= 0.05;
                } else {
                    track777.pause();
                    track777.currentTime = 0;
                    clearInterval(fadeOut);
                    if (currentMusic && originalVolume > 0) {
                        currentMusic.volume = originalVolume;
                        currentMusic.play();
                    }
                }
            }, 50);
        }, 5000);
    }
    
    updateShopDisplay();
    
    // Auto-select the new track
    currentTrack = trackNum;
    changeTrack();
}


let currentPreview = null;
let previewFadeIn = null;
let previewFadeOut = null;
let previewTimeout = null;

function previewTrack(trackNum) {
    // Stop any existing preview
    if (currentPreview) {
        clearInterval(previewFadeIn);
        clearInterval(previewFadeOut);
        clearTimeout(previewTimeout);
        currentPreview.pause();
        currentPreview.currentTime = 0;
        currentPreview = null;
    }

    const previewTrack = (trackNum === 777 ? jackpotTrack : musicTracks[trackNum]).cloneNode();
    currentPreview = previewTrack;
    const currentMusic = currentTrack ? musicTracks[currentTrack] : null;
    const originalVolume = currentMusic ? currentMusic.volume : 0;

    if (currentMusic && !currentMusic.paused) {
        currentMusic.pause();
    }

    // Start at random position for 2 second preview
    const duration = previewTrack.duration || 120;
    const randomStart = Math.random() * Math.max(0, duration - 2);
    previewTrack.currentTime = randomStart;
    previewTrack.volume = 0;
    previewTrack.play().catch(e => console.log('Preview failed:', e));

    // Fade in (0.5 seconds)
    previewFadeIn = setInterval(() => {
        if (previewTrack.volume < 0.25) {
            previewTrack.volume += 0.1;
        } else {
            previewTrack.volume = 0.3;
            clearInterval(previewFadeIn);
        }
    }, 50);

    // After 1.5 seconds, start fade out
    previewTimeout = setTimeout(() => {
        previewFadeOut = setInterval(() => {
            if (previewTrack.volume > 0.01) {
                previewTrack.volume = Math.max(0, previewTrack.volume - 0.05);
            } else {
                previewTrack.volume = 0;
                previewTrack.pause();
                previewTrack.currentTime = 0;
                clearInterval(previewFadeOut);
                currentPreview = null;
                if (currentMusic && originalVolume > 0) {
                    currentMusic.volume = originalVolume;
                    currentMusic.play();
                }
            }
        }, 30);
    }, 1500);
}

function changeTrack() {
    const select = document.getElementById('track-select');
    const selectedValue = select.value;
    
    // Stop all tracks and reset them
    Object.values(musicTracks).forEach(track => {
        track.pause();
        track.currentTime = 0;
        track.volume = 0.3;
        track.loop = true;
    });
    
    if (selectedValue === 'none') {
        currentTrack = null;
    } else {
        currentTrack = parseInt(selectedValue);
        if (musicEnabled && ownedTracks.includes(currentTrack)) {
            const track = musicTracks[currentTrack];
            track.currentTime = 0;
            track.volume = 0.3;
            track.loop = true;
            track.play().catch(e => console.log('Music play failed:', e));
        }
    }
}

// Toast notification system

function toggleMusicSelector() {
    const dropdown = document.getElementById('music-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function changeMusicFromDropdown() {
    const select = document.getElementById('music-track-select');
    const selectedValue = select.value;
    
    // Stop all tracks
    Object.values(musicTracks).forEach(track => {
        track.pause();
        track.currentTime = 0;
        track.volume = 0.3;
    });
    
    // Play selected track
    if (selectedValue && selectedValue !== 'none' && musicTracks[selectedValue]) {
        currentTrack = parseInt(selectedValue);
        currentMusic = musicTracks[selectedValue];
        currentMusic.currentTime = 0;
        currentMusic.volume = 0.3;
        if (musicEnabled) {
            currentMusic.play().catch(e => console.log('Music play failed:', e));
        }
    } else {
        currentTrack = null;
    }
    
    // Close dropdown
    document.getElementById('music-dropdown').style.display = 'none';
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cursor = 'pointer';
    
    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Update balance display
function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    // Track max balance
    if (balance > achievementStats.maxBalance) {
        achievementStats.maxBalance = balance;
        checkAchievement('millionaire');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    showToast(message, type);
}

// Switch between games
function showGame(game) {
    playSound('buttonClick');
    
    // Clean up previous game
    if (currentGame === 'stocks') {
        cleanupStocks();
    }
    
    document.querySelectorAll('.game-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    document.getElementById(`${game}-game`).classList.add('active');
    
    // Find and activate the clicked nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemText = item.textContent.toLowerCase().replace(/\s+/g, '');
        const gameName = game.toLowerCase().replace(/\s+/g, '');
        if (itemText.includes(gameName)) {
            item.classList.add('active');
        }
    });
    
    currentGame = game;
    
    // Switch stats to current game
    currentStatsGame = game;
    updateStatsDisplay();
    updateMiniGraph();
    
    // Show powerup buttons based on owned upgrades
    if (game === 'dice') {
        const btn = document.getElementById('loaded-dice-btn');
        btn.style.display = upgrades.diceBoost > 0 ? 'block' : 'none';
    } else if (game === 'plinko') {
        if (!plinkoCanvas) setTimeout(() => initPlinko(), 100);
        const btn1 = document.getElementById('lucky-plinko-btn');
        const btn2 = document.getElementById('plinko-magnet-btn');
        btn1.style.display = upgrades.plinkoLuck > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.plinkoMagnet > 0 ? 'block' : 'none';
    } else if (game === 'mines') {
        const btn1 = document.getElementById('mine-detector-btn');
        const btn2 = document.getElementById('mine-shield-btn');
        btn1.style.display = upgrades.minesReveal > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.minesShield > 0 ? 'block' : 'none';
    } else if (game === 'limbo') {
        const btn1 = document.getElementById('limbo-boost-btn');
        const btn2 = document.getElementById('limbo-precision-btn');
        btn1.style.display = upgrades.limboBoost > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.limboPrecision > 0 ? 'block' : 'none';
    } else if (game === 'crash') {
        if (!crashCanvas) setTimeout(() => initCrash(), 100);
        const btn1 = document.getElementById('crash-insurance-btn');
        const btn2 = document.getElementById('moon-shot-btn');
        btn1.style.display = upgrades.crashSafety > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.crashMoon > 0 ? 'block' : 'none';
    } else if (game === 'roulette') {
        setTimeout(() => initRoulette(), 100);
        const btn1 = document.getElementById('roulette-vision-btn');
        const btn2 = document.getElementById('wheel-magnet-btn');
        btn1.style.display = upgrades.rouletteVision > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.rouletteMagnet > 0 ? 'block' : 'none';
    } else if (game === 'stocks') {
        setTimeout(() => {
            initStocks();
            const insiderBtn = document.getElementById('insider-trading-btn');
            const bullBtn = document.getElementById('bull-market-btn');
            insiderBtn.style.display = upgrades.stocksInsider > 0 ? 'block' : 'none';
            bullBtn.style.display = upgrades.stocksForceUp > 0 ? 'block' : 'none';
        }, 100);
    } else if (game === 'blackjack') {
        createTowerGrid();
        const btn1 = document.getElementById('card-peek-btn');
        const btn2 = document.getElementById('blackjack-counter-btn');
        btn1.style.display = upgrades.blackjackPeek > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.blackjackCounter > 0 ? 'block' : 'none';
    } else if (game === 'tower') {
        createTowerGrid();
        const btn1 = document.getElementById('tower-shield-btn');
        const btn2 = document.getElementById('tower-vision-btn');
        btn1.style.display = upgrades.towerShield > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.towerVision > 0 ? 'block' : 'none';
    } else if (game === 'slots') {
        const btn1 = document.getElementById('lucky-slots-btn');
        const btn2 = document.getElementById('diamond-reels-btn');
        btn1.style.display = upgrades.slotsLuck > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.slotsDiamond > 0 ? 'block' : 'none';
    } else if (game === 'keno') {
        const btn1 = document.getElementById('keno-oracle-btn');
        const btn2 = document.getElementById('keno-master-btn');
        btn1.style.display = upgrades.kenoOracle > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.kenoMaster > 0 ? 'block' : 'none';
    } else if (game === 'coinflip') {
        const btn1 = document.getElementById('biased-coin-btn');
        const btn2 = document.getElementById('lucky-coin-btn');
        btn1.style.display = upgrades.coinBias > 0 ? 'block' : 'none';
        btn2.style.display = upgrades.coinLucky > 0 ? 'block' : 'none';
    } else if (game === 'cases') {
        // No powerups for cases yet
    } else if (game === 'scratch') {
        // No powerups for scratch yet
    } else if (game === 'horse') {
        initHorseGame();
        buildRaceTrack();
    }
}

// ===== DICE GAME =====
function updateDiceStats() {
    const target = parseFloat(document.getElementById('dice-target').value);
    const chance = 100 - target;
    const multiplier = (98 / chance).toFixed(2);
    
    document.getElementById('dice-target-value').textContent = target.toFixed(2);
    document.getElementById('dice-multiplier').textContent = multiplier + 'x';
    document.getElementById('dice-chance').textContent = chance.toFixed(2) + '%';
    
    const targetLine = document.getElementById('dice-target-line');
    targetLine.style.left = target + '%';
}

document.getElementById('dice-target').addEventListener('input', updateDiceStats);
updateDiceStats();

let diceRolling = false;

function playDice() {
    if (diceRolling) {
        showToast('Wait for current roll to finish', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('dice-bet').value);
    const target = parseFloat(document.getElementById('dice-target').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    diceRolling = true;
    balance -= betAmount;
    trackBet('dice', betAmount);
    updateBalance();

    const roll = Math.random() * 100;
    const chance = 100 - target;
    const multiplier = 98 / chance;

    // Animate roll
    const indicator = document.getElementById('dice-roll-indicator');
    const numberDisplay = document.getElementById('dice-number');
    const diceDisplay = document.querySelector('.dice-result-display');

    // Add rolling class
    numberDisplay.classList.add('rolling');

    // Quick animation
    let animationStep = 0;
    const animationInterval = setInterval(() => {
        const tempRoll = Math.random() * 100;
        indicator.style.left = tempRoll + '%';
        numberDisplay.textContent = tempRoll.toFixed(2);
        animationStep++;

        if (animationStep >= 10) {
            clearInterval(animationInterval);
            numberDisplay.classList.remove('rolling');
            indicator.style.left = roll + '%';
            numberDisplay.textContent = roll.toFixed(2);

            if (roll > target) {
                const winAmount = betAmount * multiplier;
                balance += winAmount;
                trackResult('dice', betAmount, winAmount);
                playWinSound(winAmount);
                playSound('diceWin');

                // Win animation
                numberDisplay.classList.add('win');
                numberDisplay.style.color = '#00e701';
                numberDisplay.style.textShadow = '0 0 30px #00e701, 0 0 60px #00e701, 0 0 90px #00e701';

                addWinEffect(diceDisplay);
                createParticles('+$' + winAmount.toFixed(2), '#00e701');
                showToast(`Won $${winAmount.toFixed(2)}! (${multiplier.toFixed(2)}x)`, 'success');

                // Add confetti for big wins
                if (multiplier >= 5) {
                    createConfetti();
                }

                setTimeout(() => {
                    numberDisplay.classList.remove('win');
                    numberDisplay.style.textShadow = '0 0 20px rgba(0, 231, 1, 0.8), 0 0 40px rgba(0, 231, 1, 0.5)';
                }, 800);
            } else {
                // Lose animation
                numberDisplay.classList.add('lose');
                numberDisplay.style.color = '#ff4757';
                numberDisplay.style.textShadow = '0 0 30px #ff4757, 0 0 60px #ff4757';

                trackResult('dice', betAmount, 0);
                playSound('lose');
                addLoseEffect(diceDisplay);
                createParticles('-$' + betAmount.toFixed(2), '#ff4757');
                showToast(`Lost $${betAmount.toFixed(2)}`, 'error');

                setTimeout(() => {
                    numberDisplay.classList.remove('lose');
                    numberDisplay.style.color = '#00e701';
                    numberDisplay.style.textShadow = '0 0 20px rgba(0, 231, 1, 0.8), 0 0 40px rgba(0, 231, 1, 0.5)';
                }, 500);
            }
            updateBalance();
            diceRolling = false;
        }
    }, 30);
}

// ===== PLINKO GAME =====
let plinkoCanvas, plinkoCtx;
let plinkoActive = false;
let plinkoAnimationFrame = null;
const plinkoMultipliers = {
    low: [1.3, 1.2, 1.1, 1, 0.9, 1, 1.1, 1.2, 1.3],
    medium: [2.2, 1.8, 1.4, 1.1, 0.7, 1.1, 1.4, 1.8, 2.2],
    high: [2.8, 2.2, 1.5, 0.9, 0.4, 0.9, 1.5, 2.2, 2.8]
};

function initPlinko() {
    plinkoCanvas = document.getElementById('plinko-canvas');
    if (!plinkoCanvas) return;
    
    plinkoCtx = plinkoCanvas.getContext('2d');
    drawPlinkoBoard();
    updatePlinkoMultipliers();
    
    // Start continuous redraw loop for multiple balls
    function continuousRedraw() {
        if (plinkoActive) {
            drawPlinkoBoard();
        }
        plinkoAnimationFrame = requestAnimationFrame(continuousRedraw);
    }
    continuousRedraw();
}

function drawPlinkoBoard() {
    if (!plinkoCanvas || !plinkoCtx) return;
    
    const rows = 12;
    const pegRadius = 5;
    const spacing = 45;
    const offsetX = plinkoCanvas.width / 2;
    const offsetY = 40;
    
    plinkoCtx.clearRect(0, 0, plinkoCanvas.width, plinkoCanvas.height);
    plinkoCtx.fillStyle = '#556b7c';
    
    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        for (let col = 0; col < pegsInRow; col++) {
            const x = offsetX - ((pegsInRow - 1) * spacing / 2) + (col * spacing);
            const y = offsetY + row * spacing;
            
            plinkoCtx.beginPath();
            plinkoCtx.arc(x, y, pegRadius, 0, Math.PI * 2);
            plinkoCtx.fill();
        }
    }
}

function updatePlinkoMultipliers() {
    const risk = document.getElementById('plinko-risk').value;
    const multipliers = plinkoMultipliers[risk];
    const container = document.getElementById('plinko-multipliers');
    
    container.innerHTML = '';
    multipliers.forEach(mult => {
        const div = document.createElement('div');
        div.className = 'plinko-multiplier';
        div.textContent = mult + 'x';
        
        if (mult >= 5) div.style.background = '#ff4757';
        else if (mult >= 2) div.style.background = '#ffa502';
        else if (mult >= 1) div.style.background = '#00e701';
        else div.style.background = '#556b7c';
        
        div.style.color = '#fff';
        container.appendChild(div);
    });
}

document.getElementById('plinko-risk').addEventListener('change', updatePlinkoMultipliers);

function playPlinko() {
    const betAmount = parseFloat(document.getElementById('plinko-bet').value);
    const numBalls = parseInt(document.getElementById('plinko-balls').value) || 1;

    if (plinkoActive) {
        showToast('Wait for balls to finish', 'error');
        return;
    }

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    const totalBet = betAmount * numBalls;
    if (totalBet > balance) {
        showToast('Not enough balance for all balls', 'error');
        return;
    }

    balance -= totalBet;
    trackBet('plinko', totalBet);
    updateBalance();
    plinkoActive = true;

    const risk = document.getElementById('plinko-risk').value;
    const multipliers = plinkoMultipliers[risk];

    let totalWin = 0;
    let ballsFinished = 0;

    // Drop all balls simultaneously with slight offset
    for (let i = 0; i < numBalls; i++) {
        const landingSlot = Math.floor(Math.random() * multipliers.length);
        const multiplier = multipliers[landingSlot];
        const winAmount = betAmount * multiplier;

        // Add slight delay between ball drops to prevent exact overlap
        setTimeout(() => {
            animatePlinko(landingSlot, multipliers.length, i * 50, () => {
                totalWin += winAmount;
                ballsFinished++;

                // Check if all balls are done
                if (ballsFinished >= numBalls) {
                    balance += totalWin;
                    trackResult('plinko', totalBet, totalWin);
                    playWinSound(totalWin);
                    updateBalance();
                    plinkoActive = false;

                    const profit = totalWin - totalBet;
                    if (profit > 0) {
                        showToast(`Total won: ${totalWin.toFixed(2)} (Profit: +${profit.toFixed(2)})`, 'success');
                    } else {
                        showToast(`Total won: ${totalWin.toFixed(2)} (Loss: ${Math.abs(profit).toFixed(2)})`, 'error');
                    }
                }
            });
        }, i * 100);
    }
}

function animatePlinko(landingSlot, totalSlots, startOffset, callback) {
    if (!plinkoCanvas || !plinkoCtx) {
        callback();
        return;
    }

    const rows = 12;
    const spacing = 45;
    const offsetX = plinkoCanvas.width / 2;
    const offsetY = 40;
    const ballRadius = 8;
    const pegRadius = 5;
    const maxSpeed = 6;

    // Add horizontal offset to starting position to prevent collision
    const horizontalOffset = (startOffset % 5 - 2) * 15; // Spread balls across -30 to +30 pixels
    let ballX = offsetX + horizontalOffset;
    let ballY = offsetY - 20 - (startOffset * 0.5); // Slight vertical offset too
    let velocityX = 0;
    let velocityY = 0;

    // Calculate target path
    const slotWidth = plinkoCanvas.width / totalSlots;
    const targetX = (landingSlot + 0.5) * slotWidth;

    // Get peg positions
    const pegs = [];
    for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        for (let col = 0; col < pegsInRow; col++) {
            const x = offsetX - ((pegsInRow - 1) * spacing / 2) + (col * spacing);
            const y = offsetY + row * spacing;
            pegs.push({x, y, row});
        }
    }

    let lastBounce = 0;
    const multiplierAreaY = plinkoCanvas.height - 50;

    // Generate unique color for this ball
    const hue = (startOffset * 40) % 360;
    const ballColor = `hsl(${hue}, 100%, 50%)`;

    function animate() {
        // Don't clear the board - let multiple balls draw on same canvas

        // Physics
        velocityY += 0.4;

        // Limit maximum speed
        const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (currentSpeed > maxSpeed) {
            const scale = maxSpeed / currentSpeed;
            velocityX *= scale;
            velocityY *= scale;
        }

        // Check collision with pegs
        pegs.forEach(peg => {
            const dx = ballX - peg.x;
            const dy = ballY - peg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ballRadius + pegRadius + 2) {
                const now = Date.now();
                if (now - lastBounce > 50) {
                    lastBounce = now;

                    const bounceDirection = Math.random() < 0.5 ? -1 : 1;
                    velocityX = bounceDirection * 2.2;
                    velocityY = Math.abs(velocityY) * 0.65;

                    const toTarget = targetX - ballX;
                    velocityX += toTarget * 0.015;
                }
            }
        });

        // Apply velocity
        ballX += velocityX;
        ballY += velocityY;

        // Damping
        velocityX *= 0.95;

        // Bounds
        ballX = Math.max(50, Math.min(plinkoCanvas.width - 50, ballX));

        // Ensure ball keeps moving down if stuck
        if (Math.abs(velocityY) < 0.5 && ballY < multiplierAreaY - 20) {
            velocityY = 1;
        }

        // Draw ball with unique color
        plinkoCtx.shadowBlur = 15;
        plinkoCtx.shadowColor = ballColor;
        plinkoCtx.fillStyle = ballColor;
        plinkoCtx.beginPath();
        plinkoCtx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        plinkoCtx.fill();
        plinkoCtx.shadowBlur = 0;

        // Only count as finished when ball goes well below the multiplier area
        if (ballY < multiplierAreaY + 20) {
            requestAnimationFrame(animate);
        } else {
            // Determine final slot based on X position
            const finalSlot = Math.floor((ballX / plinkoCanvas.width) * totalSlots);
            const clampedSlot = Math.max(0, Math.min(finalSlot, totalSlots - 1));
            highlightMultiplier(clampedSlot);

            callback();
        }
    }

    animate();
}

function highlightMultiplier(slotIndex) {
    const multipliers = document.querySelectorAll('.plinko-multiplier');
    if (multipliers[slotIndex]) {
        multipliers[slotIndex].style.transform = 'scale(1.2)';
        multipliers[slotIndex].style.transition = 'transform 0.3s';
        setTimeout(() => {
            multipliers[slotIndex].style.transform = 'scale(1)';
        }, 500);
    }
}

// ===== MINES GAME =====
function createMinesGrid() {
    const grid = document.getElementById('mines-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.className = 'mine-tile';
        tile.dataset.index = i;
        tile.addEventListener('click', () => revealTile(i));
        grid.appendChild(tile);
    }
}

function startMines() {
    const betAmount = parseFloat(document.getElementById('mines-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('mines', betAmount);
    updateBalance();
    
    minesGameActive = true;
    minesRevealed = 0;
    
    const minesCount = parseInt(document.getElementById('mines-count').value);
    minePositions = [];
    
    // Better distribution - divide grid into sections to spread mines out
    const sections = [];
    for (let i = 0; i < 25; i++) sections.push(i);
    
    // Shuffle all positions
    for (let i = sections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sections[i], sections[j]] = [sections[j], sections[i]];
    }
    
    // Take first N positions for mines (ensures good spread)
    minePositions = sections.slice(0, minesCount);
    
    createMinesGrid();
    document.getElementById('mines-start-btn').style.display = 'none';
    document.getElementById('mines-cashout-btn').style.display = 'block';
    document.getElementById('mines-bet').disabled = true;
    document.getElementById('mines-count').disabled = true;
    document.getElementById('mines-profit').textContent = '$0.00';
}

function revealTile(index) {
    if (!minesGameActive) return;
    
    const tile = document.querySelector(`[data-index="${index}"]`);
    if (tile.classList.contains('revealed')) return;
    
    tile.classList.add('revealed');
    
    if (minePositions.includes(index)) {
        // Check if mine shield is active
        if (window.mineShieldActive) {
            window.mineShieldActive = false;
            tile.classList.add('gem', 'scale-pop');
            tile.textContent = '�️';
            playSound('mineDiamond');
            showToast('🛡️ Mine Shield saved you!', 'success');
            minesRevealed++;
            updateMinesProfit();
            setTimeout(() => tile.classList.remove('scale-pop'), 300);
            return;
        }
        
        tile.classList.add('bomb', 'lose-shake');
        tile.textContent = '💣';
        playSound('mineLose');
        endMinesGame(false);
    } else {
        tile.classList.add('gem', 'scale-pop');
        tile.textContent = '💎';
        // Clone audio to allow overlapping sounds
        playSound('mineDiamond');
        minesRevealed++;
        updateMinesProfit();
        
        // Remove animation class after it completes
        setTimeout(() => tile.classList.remove('scale-pop'), 300);
    }
}

function updateMinesProfit() {
    const betAmount = parseFloat(document.getElementById('mines-bet').value);
    const minesCount = parseInt(document.getElementById('mines-count').value);
    
    if (minesRevealed === 0) {
        document.getElementById('mines-profit').textContent = '$0.00';
        return;
    }
    
    // Better multiplier based on mine count
    const baseMultiplier = 1.08 + (minesCount * 0.01); // More mines = better multiplier
    let multiplier = 1;
    for (let i = 0; i < minesRevealed; i++) {
        multiplier *= baseMultiplier;
    }
    
    const winAmount = betAmount * multiplier;
    const profit = winAmount - betAmount;
    document.getElementById('mines-profit').textContent = `$${profit.toFixed(2)}`;
}

function cashoutMines() {
    if (!minesGameActive) return;
    endMinesGame(true);
}

function endMinesGame(won) {
    minesGameActive = false;

    const betAmount = parseFloat(document.getElementById('mines-bet').value);
    const minesCount = parseInt(document.getElementById('mines-count').value);

    // Reveal all mines with staggered animation
    minePositions.forEach((pos, index) => {
        const tile = document.querySelector(`[data-index="${pos}"]`);
        if (tile && !tile.classList.contains('revealed')) {
            setTimeout(() => {
                tile.classList.add('revealed', 'bomb');
                tile.textContent = '💣';
                if (!won) {
                    playSound('mineLose');
                }
            }, index * 100);
        }
    });

    if (won && minesRevealed > 0) {
        const baseMultiplier = 1.08 + (minesCount * 0.01);
        let multiplier = 1;
        for (let i = 0; i < minesRevealed; i++) {
            multiplier *= baseMultiplier;
        }
        const winAmount = betAmount * multiplier;
        balance += winAmount;
        trackResult('mines', betAmount, winAmount);
        playWinSound(winAmount);
        createParticles('+$' + (winAmount - betAmount).toFixed(2), '#00e701');
        showToast(`Cashed out $${winAmount.toFixed(2)}! (${multiplier.toFixed(2)}x)`, 'success');

        if (multiplier >= 5) {
            createConfetti();
        }
    } else if (!won) {
        trackResult('mines', betAmount, 0);
        createParticles('-$' + betAmount.toFixed(2), '#ff4757');
        showToast(`Hit a mine! Lost $${betAmount.toFixed(2)}`, 'error');

        // Shake all revealed gems
        const gems = document.querySelectorAll('.mine-tile.gem');
        gems.forEach(gem => {
            gem.style.animation = 'minesLoseShake 0.5s ease';
        });
    }

    updateBalance();

    setTimeout(() => {
        document.getElementById('mines-start-btn').style.display = 'block';
        document.getElementById('mines-cashout-btn').style.display = 'none';
        document.getElementById('mines-bet').disabled = false;
        document.getElementById('mines-count').disabled = false;
        document.getElementById('mines-profit').textContent = '$0.00';
    }, minePositions.length * 100 + 500);
}

createMinesGrid();

// ===== LIMBO GAME =====
// ===== LIMBO GAME =====
let limboOnCooldown = false;

function playLimbo() {
    if (limboOnCooldown) {
        showToast('Wait for current game to finish', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('limbo-bet').value);
    const targetMultiplier = parseFloat(document.getElementById('limbo-target').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    if (isNaN(targetMultiplier) || targetMultiplier < 1.01) {
        showToast('Target must be at least 1.01x', 'error');
        return;
    }

    limboOnCooldown = true;
    balance -= betAmount;
    trackBet('limbo', betAmount);
    updateBalance();

    // Generate result with house edge
    const random = Math.random();
    const result = parseFloat((1 / (1 - random * 0.99)).toFixed(2));

    const resultDisplay = document.getElementById('limbo-result');
    const statusDisplay = document.getElementById('limbo-status');

    // Quick animate counting up
    let current = 1.00;
    const increment = result / 20; // Faster animation
    let steps = 0;

    const interval = setInterval(() => {
        current += increment;
        steps++;

        if (current >= result || steps >= 20) {
            current = result;
            clearInterval(interval);

            if (result >= targetMultiplier) {
                const winAmount = betAmount * targetMultiplier;
                balance += winAmount;
                trackResult('limbo', betAmount, winAmount);
                playWinSound(winAmount);
                resultDisplay.style.color = '#00e701';
                resultDisplay.style.textShadow = 'none';
                statusDisplay.textContent = `Won ${winAmount.toFixed(2)}!`;
                statusDisplay.style.color = '#00e701';
                showToast(`Won ${winAmount.toFixed(2)}! (${targetMultiplier.toFixed(2)}x)`, 'success');
            } else {
                trackResult('limbo', betAmount, 0);
                playSound('lose');
                resultDisplay.style.color = '#ff4757';
                resultDisplay.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';
                statusDisplay.textContent = `Lost ${betAmount.toFixed(2)}`;
                statusDisplay.style.color = '#ff4757';
                showToast(`Lost ${betAmount.toFixed(2)} - Result: ${result}x`, 'error');

                setTimeout(() => {
                    resultDisplay.style.textShadow = 'none';
                }, 2000);
            }
            updateBalance();

            // Release cooldown after animation completes
            setTimeout(() => {
                limboOnCooldown = false;
            }, 500);
        }
        resultDisplay.textContent = current.toFixed(2) + 'x';
    }, 30);
}

// Initialize
updateBalance();

// Initialize stats after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    currentStatsGame = currentGame; // Set initial stats to current game (dice)
    updateStatsDisplay();
    updateMiniGraph();
});

// Add click sound to all buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('nav-item')) {
                playSound('gameSwitch');
            }
        });
    });
    
    // Add logo click listener
    const logo = document.querySelector('.logo');
    if (logo) {
        console.log('Logo element found, adding click listener');
        logo.addEventListener('click', function(e) {
            console.log('Logo clicked!');
            showGameSelection();
        });
    } else {
        console.error('Logo element not found!');
    }
});


// ===== CRASH GAME =====
let crashCanvas, crashCtx;
let crashActive = false;
let crashMultiplier = 1.00;
let crashBetAmount = 0;
let crashPoint = 0;
let crashHistory = [];

function initCrash() {
    crashCanvas = document.getElementById('crash-canvas');
    if (!crashCanvas) return;
    
    crashCtx = crashCanvas.getContext('2d');
    drawCrashGraph();
}

function drawCrashGraph() {
    if (!crashCanvas || !crashCtx) return;

    const ctx = crashCtx;
    const width = crashCanvas.width;
    const height = crashCanvas.height;
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // Clear
    ctx.fillStyle = '#0f212e';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#2f4553';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(padding, padding + (graphHeight / 10) * i);
        ctx.lineTo(width - padding, padding + (graphHeight / 10) * i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding + (graphWidth / 10) * i, padding);
        ctx.lineTo(padding + (graphWidth / 10) * i, height - padding);
        ctx.stroke();
    }

    // Draw history
    if (crashHistory.length > 0) {
        // Find max multiplier for scaling - use dynamic max for better visualization
        const maxMult = Math.max(...crashHistory, 2);
        const crashed = !crashActive && crashHistory.length > 1;

        // Keep only last 100 points for fixed time window
        const displayHistory = crashHistory.slice(-100);

        // Draw gradient fill under the line
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, crashed ? 'rgba(255, 71, 87, 0.3)' : 'rgba(0, 231, 1, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 231, 1, 0.05)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        displayHistory.forEach((mult, i) => {
            const x = padding + (i / Math.max(displayHistory.length - 1, 1)) * graphWidth;
            // Scale based on multiplier value - higher multipliers take more vertical space
            const normalizedMult = Math.min((mult - 1) / (maxMult - 1), 1);
            const y = (height - padding) - (normalizedMult * graphHeight);
            ctx.lineTo(x, y);
        });

        // If crashed, draw line down to bottom
        if (crashed) {
            const lastX = padding + graphWidth;
            ctx.lineTo(lastX, height - padding);
        }
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        ctx.fill();

        // Draw the line
        ctx.strokeStyle = crashed ? '#ff4757' : '#00e701';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 10;
        ctx.shadowColor = crashed ? '#ff4757' : '#00e701';
        ctx.beginPath();
        displayHistory.forEach((mult, i) => {
            const x = padding + (i / Math.max(displayHistory.length - 1, 1)) * graphWidth;
            const normalizedMult = Math.min((mult - 1) / (maxMult - 1), 1);
            const y = (height - padding) - (normalizedMult * graphHeight);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        // If crashed, draw line down
        if (crashed) {
            const lastX = padding + graphWidth;
            ctx.lineTo(lastX, height - padding);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw rocket at the end of line if active
        if (crashActive && displayHistory.length > 0) {
            const lastMult = displayHistory[displayHistory.length - 1];
            const x = padding + ((displayHistory.length - 1) / Math.max(displayHistory.length - 1, 1)) * graphWidth;
            const normalizedMult = Math.min((lastMult - 1) / (maxMult - 1), 1);
            const y = (height - padding) - (normalizedMult * graphHeight);

            // Draw rocket emoji
            ctx.font = '24px Arial';
            ctx.fillText('🚀', x - 12, y + 8);
        }

        // Draw max multiplier label
        ctx.fillStyle = '#556b7c';
        ctx.font = '12px Arial';
        ctx.fillText(maxMult.toFixed(2) + 'x', 5, padding + 12);
        ctx.fillText('1.00x', 5, height - padding - 5);
    }
}

function playCrash() {
    const betAmount = parseFloat(document.getElementById('crash-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('crash', betAmount);
    updateBalance();
    
    crashActive = true;
    crashBetAmount = betAmount;
    crashMultiplier = 1.00;
    // Make crash harder: use exponential distribution for more frequent low crashes
    // This creates a house edge where crashes below 2x are more common
    const random = Math.random();
    crashPoint = 1 + Math.pow(random, 2) * 8; // Squared random makes lower values more likely
    
    document.getElementById('crash-bet-btn').style.display = 'none';
    document.getElementById('crash-cashout-btn').style.display = 'block';
    
    animateCrash();
}

function animateCrash() {
    const display = document.getElementById('crash-multiplier');
    const autoCashout = parseFloat(document.getElementById('crash-auto').value);

    crashHistory = [1.00];

    const interval = setInterval(() => {
        if (!crashActive) {
            clearInterval(interval);
            return;
        }

        crashMultiplier += 0.01;
        display.textContent = crashMultiplier.toFixed(2) + 'x';

        crashHistory.push(crashMultiplier);
        if (crashHistory.length > 100) crashHistory.shift();
        drawCrashGraph();

        if (crashMultiplier >= autoCashout) {
            crashCashout();
            clearInterval(interval);
        } else if (crashMultiplier >= crashPoint) {
            crashActive = false;
            trackResult('crash', crashBetAmount, 0);
            display.style.color = '#ff4757';
            display.textContent = 'CRASHED!';
            playSound('lose');
            showToast(`Crashed at ${crashMultiplier.toFixed(2)}x - Lost ${crashBetAmount.toFixed(2)}`, 'error');
            document.getElementById('crash-bet-btn').style.display = 'block';
            document.getElementById('crash-cashout-btn').style.display = 'none';
            clearInterval(interval);
            setTimeout(() => {
                display.style.color = '#00e701';
                display.textContent = '1.00x';
                crashHistory = [];
                drawCrashGraph();
            }, 2000);
        }
    }, 100);
}

function crashCashout() {
    if (!crashActive) return;
    
    crashActive = false;
    const winAmount = crashBetAmount * crashMultiplier;
    balance += winAmount;
    trackResult('crash', crashBetAmount, winAmount);
    playWinSound(winAmount);
    updateBalance();
    
    showToast(`Cashed out at ${crashMultiplier.toFixed(2)}x - Won $${winAmount.toFixed(2)}!`, 'success');
    document.getElementById('crash-bet-btn').style.display = 'block';
    document.getElementById('crash-cashout-btn').style.display = 'none';
}

// ===== WHEEL GAME =====
const wheelSegments = {
    low: [1.2, 1.5, 1.2, 1.5, 1.2, 1.5, 2, 1.5],
    medium: [0, 1.5, 0, 2, 0, 3, 0, 5],
    high: [0, 0, 0, 2, 0, 0, 0, 10]
};

function playWheel() {
    const betAmount = parseFloat(document.getElementById('wheel-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    updateBalance();
    
    const risk = document.getElementById('wheel-risk').value;
    const segments = wheelSegments[risk];
    const winIndex = Math.floor(Math.random() * segments.length);
    const multiplier = segments[winIndex];
    
    animateWheel(winIndex, () => {
        const winAmount = betAmount * multiplier;
        balance += winAmount;
        trackResult('roulette', totalBet, winAmount);
        playWinSound(winAmount);
        updateBalance();
        
        if (multiplier > 0) {
            showToast(`Won $${winAmount.toFixed(2)}! (${multiplier}x)`, 'success');
        } else {
            showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
        }
    });
}

function animateWheel(targetIndex, callback) {
    const canvas = document.getElementById('wheel-canvas');
    const ctx = canvas.getContext('2d');
    const risk = document.getElementById('wheel-risk').value;
    const segments = wheelSegments[risk];
    
    let rotation = 0;
    // Calculate target rotation to land on the correct segment
    // Pointer is at top (12 o'clock), so we need to rotate the segment to the top
    const segmentAngle = 360 / segments.length;
    const targetRotation = (360 * 5) - (targetIndex * segmentAngle) - (segmentAngle / 2);
    const duration = 3000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        rotation = eased * targetRotation;
        drawWheel(ctx, canvas, segments, rotation);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }
    
    animate();
}

function drawWheel(ctx, canvas, segments, rotation) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const anglePerSegment = (Math.PI * 2) / segments.length;
    
    segments.forEach((multiplier, i) => {
        const startAngle = (i * anglePerSegment) - (Math.PI / 2) + (rotation * Math.PI / 180);
        const endAngle = startAngle + anglePerSegment;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        if (multiplier === 0) ctx.fillStyle = '#ff4757';
        else if (multiplier >= 5) ctx.fillStyle = '#ffc800';
        else if (multiplier >= 2) ctx.fillStyle = '#00e701';
        else ctx.fillStyle = '#556b7c';
        
        ctx.fill();
        ctx.strokeStyle = '#0f212e';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(multiplier + 'x', radius * 0.7, 5);
        ctx.restore();
    });
    
    // Pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 20);
    ctx.lineTo(centerX - 15, centerY - radius - 40);
    ctx.lineTo(centerX + 15, centerY - radius - 40);
    ctx.closePath();
    ctx.fillStyle = '#00e701';
    ctx.fill();
}

// ===== COIN FLIP GAME =====
let selectedCoin = 'heads';

function selectCoin(side) {
    selectedCoin = side;
    document.getElementById('heads-btn').classList.remove('active');
    document.getElementById('tails-btn').classList.remove('active');
    document.getElementById(side + '-btn').classList.add('active');
}

function playCoinFlip() {
    const betAmount = parseFloat(document.getElementById('coinflip-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    balance -= betAmount;
    trackBet('coinflip', betAmount);
    updateBalance();

    playSound('coinFlip');

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const coin = document.getElementById('coin');
    const resultDisplay = document.getElementById('coin-result');

    // Reset coin
    coin.classList.remove('flipping-heads', 'flipping-tails');
    coin.style.transform = 'rotateY(0deg)';
    resultDisplay.textContent = '';

    setTimeout(() => {
        // Add appropriate animation class
        if (result === 'heads') {
            coin.classList.add('flipping-heads');
        } else {
            coin.classList.add('flipping-tails');
        }
    }, 10);

    setTimeout(() => {
        resultDisplay.textContent = result.toUpperCase();

        // Keep the coin on the final result side
        coin.classList.remove('flipping-heads', 'flipping-tails');
        if (result === 'heads') {
            coin.style.transform = 'rotateY(0deg)';
        } else {
            coin.style.transform = 'rotateY(180deg)';
        }

        if (result === selectedCoin) {
            const winAmount = betAmount * 2;
            balance += winAmount;
            trackResult('coinflip', betAmount, winAmount);
            playWinSound(winAmount);
            resultDisplay.style.color = '#00e701';
            resultDisplay.classList.add('scale-pop');
            showToast(`Won $${winAmount.toFixed(2)}!`, 'success');
            
            const coinDisplay = document.querySelector('.coin-result-display');
            addWinEffect(coinDisplay);
            createParticles('+$' + winAmount.toFixed(2), '#00e701');
        } else {
            trackResult('coinflip', betAmount, 0);
            playSound('lose');
            resultDisplay.style.color = '#ff4757';
            resultDisplay.classList.add('lose-shake');
            showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
            
            const coinDisplay = document.querySelector('.coin-result-display');
            addLoseEffect(coinDisplay);
            createParticles('-$' + betAmount.toFixed(2), '#ff4757');
        }
        updateBalance();
        
        setTimeout(() => {
            resultDisplay.classList.remove('scale-pop', 'lose-shake');
        }, 500);
    }, 1500);
}

// ===== ROULETTE GAME =====
const rouletteNumbers = [
    {num: 0, color: 'green'},
    {num: 32, color: 'red'}, {num: 15, color: 'black'}, {num: 19, color: 'red'}, {num: 4, color: 'black'},
    {num: 21, color: 'red'}, {num: 2, color: 'black'}, {num: 25, color: 'red'}, {num: 17, color: 'black'},
    {num: 34, color: 'red'}, {num: 6, color: 'black'}, {num: 27, color: 'red'}, {num: 13, color: 'black'},
    {num: 36, color: 'red'}, {num: 11, color: 'black'}, {num: 30, color: 'red'}, {num: 8, color: 'black'},
    {num: 23, color: 'red'}, {num: 10, color: 'black'}, {num: 5, color: 'red'}, {num: 24, color: 'black'},
    {num: 16, color: 'red'}, {num: 33, color: 'black'}, {num: 1, color: 'red'}, {num: 20, color: 'black'},
    {num: 14, color: 'red'}, {num: 31, color: 'black'}, {num: 9, color: 'red'}, {num: 22, color: 'black'},
    {num: 18, color: 'red'}, {num: 29, color: 'black'}, {num: 7, color: 'red'}, {num: 28, color: 'black'},
    {num: 12, color: 'red'}, {num: 35, color: 'black'}, {num: 3, color: 'red'}, {num: 26, color: 'black'}
];

let rouletteInitialized = false;
let rouletteSelectedBets = []; // Array to hold multiple bets

function initRoulette() {
    if (rouletteInitialized) return;
    rouletteInitialized = true;

    const grid = document.getElementById('roulette-number-grid');
    grid.innerHTML = '';

    for (let i = 1; i <= 36; i++) {
        const numData = rouletteNumbers.find(n => n.num === i);
        const numDiv = document.createElement('div');
        numDiv.className = `number-bet ${numData.color}-number`;
        numDiv.textContent = i;
        numDiv.onclick = () => selectRouletteBet(i, 36);
        grid.appendChild(numDiv);
    }
}

function selectRouletteBet(bet, multiplier) {
    // Check if bet already selected
    const existingIndex = rouletteSelectedBets.findIndex(b => b.bet === bet);
    
    if (existingIndex >= 0) {
        // Remove if already selected (toggle)
        rouletteSelectedBets.splice(existingIndex, 1);
    } else {
        // Add new bet
        rouletteSelectedBets.push({ bet, multiplier });
    }
    
    updateRouletteDisplay();
}

function updateRouletteDisplay() {
    // Update display
    const display = document.getElementById('roulette-selected-bet');
    if (rouletteSelectedBets.length === 0) {
        display.textContent = 'None';
    } else if (rouletteSelectedBets.length === 1) {
        const b = rouletteSelectedBets[0];
        if (typeof b.bet === 'number') {
            display.textContent = `Number ${b.bet} (${b.multiplier}x)`;
        } else {
            const betNames = {
                'red': 'RED',
                'black': 'BLACK',
                'green': 'GREEN',
                'even': 'EVEN',
                'odd': 'ODD',
                'low': '1-18',
                'high': '19-36'
            };
            display.textContent = `${betNames[b.bet] || b.bet.toUpperCase()} (${b.multiplier}x)`;
        }
    } else {
        display.textContent = `${rouletteSelectedBets.length} bets selected`;
    }
    
    // Update visual selection
    document.querySelectorAll('.bet-option, .number-bet').forEach(el => {
        el.classList.remove('selected');
    });
    
    rouletteSelectedBets.forEach(({ bet }) => {
        if (typeof bet === 'number') {
            const numBet = Array.from(document.querySelectorAll('.number-bet')).find(el => el.textContent == bet);
            if (numBet) numBet.classList.add('selected');
        } else {
            // Try to find by class first (for color bets)
            let betElement = document.querySelector(`.color-${bet}`);
            // If not found, search by onclick attribute for other bets
            if (!betElement) {
                betElement = Array.from(document.querySelectorAll('.bet-option')).find(el => 
                    el.onclick && el.onclick.toString().includes(`'${bet}'`)
                );
            }
            if (betElement) betElement.classList.add('selected');
        }
    });
}

function clearRouletteBet() {
    rouletteSelectedBets = [];
    updateRouletteDisplay();
}

function useRouletteVision() {
    if (upgrades.rouletteVision <= 0) {
        showToast('No Roulette Vision available', 'error');
        return;
    }
    
    // Generate the result that will happen
    const result = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    
    // Show prediction
    const colorName = result.color === 'red' ? 'RED' : result.color === 'black' ? 'BLACK' : 'GREEN';
    showToast(`🔮 Vision: ${result.num} ${colorName} will win!`, 'success');
    
    // Use one charge
    upgrades.rouletteVision--;
    updateShopDisplay();
    
    const btn = document.getElementById('roulette-vision-btn');
    if (upgrades.rouletteVision <= 0) {
        btn.style.display = 'none';
    }
}

function playRoulette() {
    const betAmount = parseFloat(document.getElementById('roulette-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    if (rouletteSelectedBets.length === 0) {
        showToast('Select at least one bet!', 'error');
        return;
    }

    const totalBet = betAmount * rouletteSelectedBets.length;
    if (totalBet > balance) {
        showToast('Not enough balance for all bets!', 'error');
        return;
    }

    balance -= totalBet;
    trackBet('roulette', totalBet);
    updateBalance();

    // Generate random result
    const result = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];

    const wheel = document.getElementById('roulette-inner');
    const centerDisplay = document.getElementById('roulette-center');
    const resultDisplay = document.getElementById('roulette-result');

    // Calculate rotation
    const segmentAngle = 360 / 37;
    const resultIndex = rouletteNumbers.findIndex(n => n.num === result.num);
    const targetAngle = (360 * 8) + (resultIndex * segmentAngle);

    // Start sound slightly after animation starts for better sync
    setTimeout(() => playSound('rouletteSpin'), 50);

    // Animate wheel (ball stays fixed)
    wheel.style.transition = 'transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `translate(-50%, -50%) rotate(${targetAngle}deg)`;

    setTimeout(() => {
        centerDisplay.textContent = result.num;
        resultDisplay.textContent = `${result.num} ${result.color.toUpperCase()}`;
        resultDisplay.style.color = result.color === 'red' ? '#ff4757' : result.color === 'black' ? '#b1bad3' : '#00e701';

        let totalWinAmount = 0;
        let winningBets = [];

        // Helper function to get surrounding numbers in 3x3 grid
        function getSurroundingNumbers(num) {
            if (num === 0) return [];

            // Numbers are arranged in 3 columns (1-34, 2-35, 3-36)
            // Row calculation: row = Math.ceil(num / 3)
            // Column calculation: col = ((num - 1) % 3) + 1

            const row = Math.ceil(num / 3);
            const col = ((num - 1) % 3) + 1;
            const surrounding = [];

            // Check 3x3 grid around the number
            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 1 && r <= 12 && c >= 1 && c <= 3) {
                        const surroundNum = (r - 1) * 3 + c;
                        if (surroundNum !== num && surroundNum >= 1 && surroundNum <= 36) {
                            surrounding.push(surroundNum);
                        }
                    }
                }
            }

            return surrounding;
        }

        const surroundingNums = getSurroundingNumbers(result.num);

        // Check each bet
        rouletteSelectedBets.forEach(({ bet, multiplier }) => {
            let won = false;
            let winMultiplier = 0;
            let betType = '';

            // Check if betting on color or other string bets
            if (typeof bet === 'string') {
                if (bet === result.color) {
                    won = true;
                    winMultiplier = 2; // Color bets pay 2x
                    betType = 'color';
                } else if (bet === 'even' && result.num !== 0 && result.num % 2 === 0) {
                    won = true;
                    winMultiplier = 2;
                    betType = 'even';
                } else if (bet === 'odd' && result.num % 2 === 1) {
                    won = true;
                    winMultiplier = 2;
                    betType = 'odd';
                } else if (bet === 'low' && result.num >= 1 && result.num <= 18) {
                    won = true;
                    winMultiplier = 2;
                    betType = 'low';
                } else if (bet === 'high' && result.num >= 19 && result.num <= 36) {
                    won = true;
                    winMultiplier = 2;
                    betType = 'high';
                }
            } else {
                // Betting on specific number
                if (bet === result.num) {
                    // Exact number hit = 4x
                    won = true;
                    winMultiplier = 4;
                    betType = 'exact';
                } else if (surroundingNums.includes(bet)) {
                    // Surrounding number hit = 2x
                    won = true;
                    winMultiplier = 2;
                    betType = 'surrounding';
                }
            }

            if (won) {
                const winAmount = betAmount * winMultiplier;
                totalWinAmount += winAmount;
                winningBets.push({ bet, multiplier: winMultiplier, winAmount, betType });
            }
        });

        // Check for bonus: if you bet on exact/surrounding number AND the color
        const numberBets = rouletteSelectedBets.filter(b => typeof b.bet === 'number');
        const colorBets = rouletteSelectedBets.filter(b => b.bet === result.color);

        if (numberBets.length > 0 && colorBets.length > 0) {
            // Check if any number bet won
            const wonNumberBet = winningBets.find(wb => wb.betType === 'exact' || wb.betType === 'surrounding');
            if (wonNumberBet) {
                // Add color bonus (already paid 2x for color, this is the combo bonus)
                const colorBonus = betAmount * 2;
                totalWinAmount += colorBonus;
                winningBets.push({ bet: 'color combo', multiplier: 2, winAmount: colorBonus, betType: 'combo' });
            }
        }

        if (totalWinAmount > 0) {
            balance += totalWinAmount;
            trackResult('roulette', totalBet, totalWinAmount);
            playWinSound(totalWinAmount);
            createParticles('+' + totalWinAmount.toFixed(2), '#00e701');

            // Make result glow green on win
            resultDisplay.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';

            if (winningBets.length === 1) {
                const wb = winningBets[0];
                const betName = typeof wb.bet === 'number' ? `Number ${wb.bet}` : wb.bet.toString().toUpperCase();
                showToast(`${betName} won $${wb.winAmount.toFixed(2)}! (${wb.multiplier}x)`, 'success');
            } else {
                showToast(`${winningBets.length} bets won $${totalWinAmount.toFixed(2)}!`, 'success');
            }
        } else {
            trackResult('roulette', totalBet, 0);
            playSound('lose');
            createParticles('-' + totalBet.toFixed(2), '#ff4757');

            // Make result glow red on loss
            resultDisplay.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';

            showToast(`Lost $${totalBet.toFixed(2)} (${rouletteSelectedBets.length} bets)`, 'error');
        }

        updateBalance();

        // Reset rotation and glow after delay
        setTimeout(() => {
            wheel.style.transition = 'none';
            wheel.style.transform = 'translate(-50%, -50%) rotate(0deg)';

            // Clear glow effect
            resultDisplay.style.textShadow = 'none';
        }, 500);
    }, 8000);
}

// ===== KENO GAME =====
let kenoSelected = [];
let kenoGameActive = false;

function createKenoGrid() {
    const grid = document.getElementById('keno-grid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 40; i++) {
        const tile = document.createElement('div');
        tile.className = 'keno-tile';
        tile.textContent = i;
        tile.dataset.number = i;
        tile.addEventListener('click', () => toggleKenoTile(i, tile));
        grid.appendChild(tile);
    }
}

function toggleKenoTile(number, tile) {
    if (kenoSelected.includes(number)) {
        kenoSelected = kenoSelected.filter(n => n !== number);
        tile.classList.remove('selected');
        playSound('kenoSelect');
    } else if (kenoSelected.length < 5) {
        kenoSelected.push(number);
        tile.classList.add('selected');
        playSound('kenoSelect');
    } else {
        showToast('Maximum 3 numbers can be selected', 'error');
    }
    
    document.getElementById('keno-selected').textContent = kenoSelected.length;
}

function clearKeno() {
    kenoSelected = [];
    kenoGameActive = false;
    document.querySelectorAll('.keno-tile').forEach(tile => {
        tile.classList.remove('selected', 'hit', 'miss');
    });
    document.getElementById('keno-selected').textContent = '0';
}

function playKeno() {
    if (kenoGameActive) {
        showToast('Wait for current game to finish', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('keno-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    if (kenoSelected.length === 0) {
        showToast('Select at least 1 number', 'error');
        return;
    }

    kenoGameActive = true;
    document.querySelectorAll('.keno-tile').forEach(tile => {
        tile.classList.remove('selected', 'hit', 'miss');
    });
    document.getElementById('keno-selected').textContent = '0';
}

function playKeno() {
    if (kenoGameActive) {
        showToast('Wait for current game to finish', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('keno-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    if (kenoSelected.length === 0) {
        showToast('Select at least 1 number', 'error');
        return;
    }

    kenoGameActive = true;

    balance -= betAmount;
    trackBet('keno', betAmount);
    updateBalance();

    const drawn = [];
    while (drawn.length < 10) {
        const num = Math.floor(Math.random() * 40) + 1;
        if (!drawn.includes(num)) drawn.push(num);
    }

    let hits = 0;
    document.querySelectorAll('.keno-tile').forEach(tile => {
        const num = parseInt(tile.dataset.number);
        if (drawn.includes(num)) {
            tile.classList.add('hit');
            if (kenoSelected.includes(num)) hits++;
        } else if (kenoSelected.includes(num)) {
            tile.classList.add('miss');
        }
    });

    // Adjusted multipliers for 3 picks max
    const multipliers = [0, 0, 2, 5];
    const multiplier = multipliers[hits] || 0;
    const winAmount = betAmount * multiplier;

    balance += winAmount;
    trackResult('keno', betAmount, winAmount);
    playWinSound(winAmount);
    updateBalance();

    if (multiplier > 0) {
        showToast(`${hits} hits! Won ${winAmount.toFixed(2)} (${multiplier}x)`, 'success');
    } else {
        playSound('lose');
        showToast(`${hits} hits - Lost ${betAmount.toFixed(2)}`, 'error');
    }

    setTimeout(() => clearKeno(), 3000);
}

createKenoGrid();


// ===== STOCKS GAME =====
let stockPrice = 100;
let stockShares = 0;
let stockBuyPrice = 0;
let stockHistory = [];
let stockCanvas, stockCtx;
let stockInterval;
let insiderTradingActive = false;
let futureStockPrices = [];
let futureStockIndex = 0;
let bullMarketActive = false;
let bullMarketEndTime = 0;
let currentStockSymbol = 'btc';

const stockProfiles = {
    btc: { name: 'Bitcoin', volatility: 0.04, trend: 0.0008, color: '#f7931a', crashChance: 0.02, moonChance: 0.015 },
    eth: { name: 'Ethereum', volatility: 0.03, trend: 0.0006, color: '#627eea', crashChance: 0.015, moonChance: 0.02 },
    tech: { name: 'Tech Corp', volatility: 0.02, trend: 0.0004, color: '#00e701', crashChance: 0.01, moonChance: 0.01 },
    stable: { name: 'Blue Chip', volatility: 0.01, trend: 0.0002, color: '#4a90e2', crashChance: 0.005, moonChance: 0.005 },
    penny: { name: 'Penny Stock', volatility: 0.06, trend: 0.0003, color: '#ff4757', crashChance: 0.03, moonChance: 0.025 },
    gold: { name: 'Gold', volatility: 0.008, trend: 0.0001, color: '#ffd700', crashChance: 0.003, moonChance: 0.003 },
    meme: { name: 'Meme Stock', volatility: 0.08, trend: 0.0005, color: '#ff69b4', crashChance: 0.04, moonChance: 0.035 }
};

// Per-stock state: each stock has its own price, history, shares and buyPrice
const stockStates = {};
function getStockState(symbol) {
    if (!stockStates[symbol]) {
        stockStates[symbol] = { price: 100, history: [{ price: 100, time: 0 }], shares: 0, buyPrice: 0 };
    }
    return stockStates[symbol];
}

function initStocks() {
    stockCanvas = document.getElementById('stocks-canvas');
    if (!stockCanvas) return;
    stockCtx = stockCanvas.getContext('2d');

    // Load current stock state
    const sym = document.getElementById('stocks-choice').value || 'btc';
    currentStockSymbol = sym;
    const state = getStockState(sym);
    stockPrice = state.price;
    stockHistory = state.history;
    stockShares = state.shares;
    stockBuyPrice = state.buyPrice;

    // Start interval only once
    if (!stockInterval) {
        stockInterval = setInterval(updateStockPrice, 1000);
    }

    // Add event listener for stock choice change
    const stockChoice = document.getElementById('stocks-choice');
    if (stockChoice && !stockChoice.hasAttribute('data-listener-added')) {
        stockChoice.addEventListener('change', () => {
            // Save current stock state including shares
            stockStates[currentStockSymbol] = { price: stockPrice, history: stockHistory, shares: stockShares, buyPrice: stockBuyPrice };

            // Load new stock state
            currentStockSymbol = stockChoice.value;
            const newState = getStockState(currentStockSymbol);
            stockPrice = newState.price;
            stockHistory = newState.history;
            stockShares = newState.shares;
            stockBuyPrice = newState.buyPrice;

            document.getElementById('stock-price').textContent = stockPrice.toFixed(2);
            document.getElementById('stock-shares').textContent = stockShares.toFixed(4);
            document.getElementById('portfolio-value').textContent = '$' + (stockShares * stockPrice).toFixed(2);
            drawStockChart();
            showToast(`Switched to ${stockProfiles[currentStockSymbol]?.name || currentStockSymbol}`, 'info');
        });
        stockChoice.setAttribute('data-listener-added', 'true');
    }

    document.getElementById('stock-price').textContent = stockPrice.toFixed(2);
    drawStockChart();
}

// Clean up stocks when leaving the game
function cleanupStocks() {
    if (stockInterval) {
        clearInterval(stockInterval);
        stockInterval = null;
    }
}

function updateStockPrice() {
    const choice = document.getElementById('stocks-choice').value;
    const profile = stockProfiles[choice] || stockProfiles.tech;

    // If insider trading is active, follow the predicted path
    if (insiderTradingActive && futureStockIndex < futureStockPrices.length) {
        stockPrice = futureStockPrices[futureStockIndex];
        futureStockIndex++;

        if (futureStockIndex >= futureStockPrices.length) {
            insiderTradingActive = false;
            futureStockPrices = [];
            futureStockIndex = 0;
            if (currentGame === 'stocks') {
                showToast('Insider Trading expired', 'info');
            }
        }
    }
    // Check if bull market is active
    else if (bullMarketActive && Date.now() < bullMarketEndTime) {
        // Force stock to go up during bull market
        const increase = stockPrice * (0.02 + Math.random() * 0.03); // 2-5% increase per second
        stockPrice = stockPrice + increase;
    } else {
        if (bullMarketActive && Date.now() >= bullMarketEndTime) {
            bullMarketActive = false;
            if (currentGame === 'stocks') {
                showToast('Bull Market ended', 'info');
            }
        }

        // Check for rare events
        const rand = Math.random();

        if (rand < profile.crashChance) {
            // Market crash!
            const crashAmount = stockPrice * (0.15 + Math.random() * 0.25);
            stockPrice = Math.max(10, stockPrice - crashAmount);
            if (currentGame === 'stocks') {
                showToast(`📉 MARKET CRASH! ${profile.name} dropped ${((crashAmount / (stockPrice + crashAmount)) * 100).toFixed(1)}%`, 'error');
            }
        } else if (rand < profile.crashChance + profile.moonChance) {
            // Moon shot!
            const moonAmount = stockPrice * (0.2 + Math.random() * 0.3);
            stockPrice = stockPrice + moonAmount;
            if (currentGame === 'stocks') {
                showToast(`🚀 TO THE MOON! ${profile.name} surged ${((moonAmount / (stockPrice - moonAmount)) * 100).toFixed(1)}%`, 'success');
            }
        } else {
            // Normal random walk with drift
            const randomChange = (Math.random() - 0.5) * 2;
            const change = (randomChange * profile.volatility + profile.trend) * stockPrice;
            stockPrice = Math.max(10, stockPrice + change);
        }
    }

    stockHistory.push({price: stockPrice, time: stockHistory.length});

    // Keep only last 100 data points to prevent memory issues
    if (stockHistory.length > 100) {
        stockHistory.shift();
    }

    // Save state back to current stock
    stockStates[currentStockSymbol] = { price: stockPrice, history: stockHistory, shares: stockShares, buyPrice: stockBuyPrice };

    document.getElementById('stock-price').textContent = stockPrice.toFixed(2);

    if (stockShares > 0) {
        const portfolioValue = stockShares * stockPrice;
        const profitLoss = portfolioValue - stockBuyPrice;

        document.getElementById('portfolio-value').textContent = '$' + portfolioValue.toFixed(2);
        document.getElementById('profit-loss').textContent = (profitLoss >= 0 ? '+' : '') + '$' + profitLoss.toFixed(2);
        document.getElementById('profit-loss').className = 'stat-value ' + (profitLoss >= 0 ? '' : 'negative');
    }

    drawStockChart();
}

function drawStockChart() {
    if (!stockCtx || !stockCanvas) return;

    const choice = document.getElementById('stocks-choice').value;
    const profile = stockProfiles[choice] || stockProfiles.tech;

    stockCtx.clearRect(0, 0, stockCanvas.width, stockCanvas.height);

    if (stockHistory.length < 2) return;

    const padding = 40;
    const width = stockCanvas.width - padding * 2;
    const height = stockCanvas.height - padding * 2;

    // Only show remaining future prices (not consumed ones)
    const remainingFuture = insiderTradingActive && futureStockPrices.length > 0
        ? futureStockPrices.slice(futureStockIndex)
        : [];

    // Combine history and remaining future prices for scaling
    const allPrices = [...stockHistory.map(p => p.price)];
    if (remainingFuture.length > 0) {
        allPrices.push(...remainingFuture);
    }

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceRange = maxPrice - minPrice || 1;

    // Draw grid
    stockCtx.strokeStyle = '#2f4553';
    stockCtx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        stockCtx.beginPath();
        stockCtx.moveTo(padding, y);
        stockCtx.lineTo(padding + width, y);
        stockCtx.stroke();

        // Price labels
        const price = maxPrice - (priceRange / 5) * i;
        stockCtx.fillStyle = '#556b7c';
        stockCtx.font = '12px Arial';
        stockCtx.fillText('$' + price.toFixed(0), 5, y + 4);
    }

    // Draw historical line with stock color
    stockCtx.beginPath();
    stockCtx.strokeStyle = profile.color;
    stockCtx.lineWidth = 2;

    const totalPoints = stockHistory.length + remainingFuture.length;

    stockHistory.forEach((point, i) => {
        const x = padding + (i / Math.max(totalPoints - 1, 1)) * width;
        const y = padding + height - ((point.price - minPrice) / priceRange) * height;

        if (i === 0) stockCtx.moveTo(x, y);
        else stockCtx.lineTo(x, y);
    });

    stockCtx.stroke();

    // Draw remaining future prices if insider trading is active
    if (remainingFuture.length > 0) {
        stockCtx.beginPath();
        stockCtx.strokeStyle = '#ffc800';
        stockCtx.lineWidth = 2;
        stockCtx.setLineDash([5, 5]);

        // Start from last historical point
        const lastHistX = padding + ((stockHistory.length - 1) / Math.max(totalPoints - 1, 1)) * width;
        const lastHistY = padding + height - ((stockHistory[stockHistory.length - 1].price - minPrice) / priceRange) * height;
        stockCtx.moveTo(lastHistX, lastHistY);

        remainingFuture.forEach((price, i) => {
            const x = padding + ((stockHistory.length + i) / Math.max(totalPoints - 1, 1)) * width;
            const y = padding + height - ((price - minPrice) / priceRange) * height;
            stockCtx.lineTo(x, y);
        });

        stockCtx.stroke();
        stockCtx.setLineDash([]);

        // Add label with remaining time
        const remainingSeconds = remainingFuture.length;
        stockCtx.fillStyle = '#ffc800';
        stockCtx.font = 'bold 14px Arial';
        stockCtx.fillText(`FUTURE (${remainingSeconds}s)`, padding + width - 120, padding + 20);
    }
    
    // Draw bull market timer if active
    if (bullMarketActive) {
        const remainingTime = Math.max(0, Math.ceil((bullMarketEndTime - Date.now()) / 1000));
        stockCtx.fillStyle = '#00e701';
        stockCtx.font = 'bold 16px Arial';
        stockCtx.fillText(`🐂 BULL MARKET (${remainingTime}s)`, padding + 10, padding + 20);
    }

    // Fill area with stock color (historical only)
    stockCtx.beginPath();
    stockHistory.forEach((point, i) => {
        const x = padding + (i / Math.max(totalPoints - 1, 1)) * width;
        const y = padding + height - ((point.price - minPrice) / priceRange) * height;
        if (i === 0) stockCtx.moveTo(x, y);
        else stockCtx.lineTo(x, y);
    });

    stockCtx.lineTo(padding + ((stockHistory.length - 1) / Math.max(totalPoints - 1, 1)) * width, padding + height);
    stockCtx.lineTo(padding, padding + height);
    stockCtx.closePath();

    // Determine if price is up or down
    const isUp = stockHistory[stockHistory.length - 1].price >= stockHistory[0].price;
    const alpha = isUp ? 0.15 : 0.1;

    stockCtx.fillStyle = profile.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    stockCtx.fill();

    // Draw stock name
    stockCtx.fillStyle = profile.color;
    stockCtx.font = 'bold 16px Arial';
    stockCtx.fillText(profile.name, padding, padding - 10);
}

function buyStock() {
    const betAmount = parseFloat(document.getElementById('stocks-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid investment amount', 'error');
        return;
    }
    
    const choice = document.getElementById('stocks-choice').value;
    const profile = stockProfiles[choice] || stockProfiles.tech;
    
    const shares = betAmount / stockPrice;
    stockShares += shares;
    stockBuyPrice += betAmount;
    balance -= betAmount;
    trackBet('stocks', betAmount);
    
    updateBalance();
    document.getElementById('stock-shares').textContent = stockShares.toFixed(4);
    
    createParticles('+' + shares.toFixed(2) + ' shares', profile.color);
    showToast(`Bought ${shares.toFixed(4)} ${profile.name} shares at $${stockPrice.toFixed(2)}`, 'success');
}

function sellStock() {
    if (stockShares === 0) {
        showToast('No shares to sell', 'error');
        return;
    }
    
    const choice = document.getElementById('stocks-choice').value;
    const profile = stockProfiles[choice] || stockProfiles.tech;
    
    const sellValue = stockShares * stockPrice;
    const profit = sellValue - stockBuyPrice;
    
    trackResult('stocks', stockBuyPrice, sellValue);
    balance += sellValue;
    if (profit > 0) {
        playWinSound(sellValue);
    }
    updateBalance();
    
    createParticles((profit >= 0 ? '+' : '') + '$' + profit.toFixed(2), profit >= 0 ? '#00e701' : '#ff4757');
    showToast(`Sold ${stockShares.toFixed(4)} ${profile.name} shares for $${sellValue.toFixed(2)}`, profit >= 0 ? 'success' : 'error');
    
    stockShares = 0;
    stockBuyPrice = 0;
    document.getElementById('stock-shares').textContent = '0';
    document.getElementById('portfolio-value').textContent = '$0.00';
    document.getElementById('profit-loss').textContent = '$0.00';
}

function useInsiderTrading() {
    if (upgrades.stocksInsider <= 0) {
        showToast('No Insider Trading available!', 'error');
        return;
    }

    upgrades.stocksInsider--;
    const displayElement = document.getElementById('upgrade-stocksInsider');
    if (displayElement) {
        displayElement.textContent = upgrades.stocksInsider;
    }

    if (upgrades.stocksInsider === 0) {
        document.getElementById('insider-trading-btn').style.display = 'none';
    }

    insiderTradingActive = true;
    futureStockIndex = 0;
    showToast('📈 Insider Trading Active! Showing next 60 seconds...', 'success');

    // Generate future prices for next 60 seconds
    const choice = document.getElementById('stocks-choice').value;
    const profile = stockProfiles[choice] || stockProfiles.tech;

    futureStockPrices = [];
    let futurePrice = stockPrice;

    for (let i = 0; i < 60; i++) {
        const rand = Math.random();

        if (rand < profile.crashChance) {
            const crashAmount = futurePrice * (0.15 + Math.random() * 0.25);
            futurePrice = Math.max(10, futurePrice - crashAmount);
        } else if (rand < profile.crashChance + profile.moonChance) {
            const moonAmount = futurePrice * (0.2 + Math.random() * 0.3);
            futurePrice = futurePrice + moonAmount;
        } else {
            const randomChange = (Math.random() - 0.5) * 2;
            const change = (randomChange * profile.volatility + profile.trend) * futurePrice;
            futurePrice = Math.max(10, futurePrice + change);
        }

        futureStockPrices.push(futurePrice);
    }

    // Redraw chart with future prices
    drawStockChart();
}

function useBullMarket() {
    if (upgrades.stocksForceUp <= 0) {
        showToast('No Bull Market available!', 'error');
        return;
    }
    
    if (insiderTradingActive) {
        showToast('Cannot use Bull Market while Insider Trading is active!', 'error');
        return;
    }

    upgrades.stocksForceUp--;
    const displayElement = document.getElementById('upgrade-stocksForceUp');
    if (displayElement) {
        displayElement.textContent = upgrades.stocksForceUp;
    }

    if (upgrades.stocksForceUp === 0) {
        document.getElementById('bull-market-btn').style.display = 'none';
    }

    bullMarketActive = true;
    bullMarketEndTime = Date.now() + 30000;
    showToast('🐂 Bull Market Active! Stock will rise for 30 seconds!', 'success');

    // Update chart to show timer
    drawStockChart();

    setTimeout(() => {
        if (bullMarketActive) {
            bullMarketActive = false;
            showToast('Bull Market ended', 'info');
            drawStockChart(); // Redraw to remove timer
        }
    }, 30000);
}

// ===== POWERUP FUNCTIONS =====

// Dice powerup
function useLoadedDice() {
    if (upgrades.diceBoost <= 0) {
        showToast('No Loaded Dice available!', 'error');
        return;
    }

    upgrades.diceBoost--;
    const displayElement = document.getElementById('upgrade-diceBoost');
    if (displayElement) {
        displayElement.textContent = upgrades.diceBoost;
    }

    if (upgrades.diceBoost === 0) {
        document.getElementById('loaded-dice-btn').style.display = 'none';
    }

    // Trigger a guaranteed win
    const betAmount = parseFloat(document.getElementById('dice-bet').value);
    const target = parseFloat(document.getElementById('dice-target').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.diceBoost++; // Refund
        if (displayElement) displayElement.textContent = upgrades.diceBoost;
        document.getElementById('loaded-dice-btn').style.display = 'block';
        return;
    }

    balance -= betAmount;
    updateBalance();

    const chance = 100 - target;
    const multiplier = 98 / chance;
    const roll = target + 0.01; // Guaranteed win

    const indicator = document.getElementById('dice-roll-indicator');
    const numberDisplay = document.getElementById('dice-number');
    const diceDisplay = document.querySelector('.dice-result-display');

    indicator.style.left = roll + '%';
    numberDisplay.textContent = roll.toFixed(2);

    const winAmount = betAmount * multiplier;
    balance += winAmount;
    playWinSound(winAmount);
    playSound('diceWin');
    numberDisplay.style.color = '#00e701';
    numberDisplay.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
    addWinEffect(diceDisplay);
    createParticles('+$' + winAmount.toFixed(2), '#00e701');
    showToast(`🎲 Loaded Dice! Won $${winAmount.toFixed(2)}! (${multiplier.toFixed(2)}x)`, 'success');

    if (winAmount >= 100) {
        createConfetti();
    }

    updateBalance();

    setTimeout(() => {
        numberDisplay.style.textShadow = '0 0 10px rgba(0, 231, 1, 0.6), 0 0 20px rgba(0, 231, 1, 0.3)';
    }, 2000);
}

// Plinko powerup
function useLuckyPlinko() {
    if (upgrades.plinkoLuck <= 0) {
        showToast('No Lucky Plinko available!', 'error');
        return;
    }

    upgrades.plinkoLuck--;
    const displayElement = document.getElementById('upgrade-plinkoLuck');
    if (displayElement) {
        displayElement.textContent = upgrades.plinkoLuck;
    }

    if (upgrades.plinkoLuck === 0) {
        document.getElementById('lucky-plinko-btn').style.display = 'none';
    }

    const betAmount = parseFloat(document.getElementById('plinko-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.plinkoLuck++; // Refund
        if (displayElement) displayElement.textContent = upgrades.plinkoLuck;
        document.getElementById('lucky-plinko-btn').style.display = 'block';
        return;
    }

    balance -= betAmount;
    updateBalance();

    const risk = document.getElementById('plinko-risk').value;
    const multipliers = plinkoMultipliers[risk];
    
    // Guaranteed high multiplier (highest in the array)
    const maxMultiplier = Math.max(...multipliers);
    const landingSlot = multipliers.indexOf(maxMultiplier);

    animatePlinko(landingSlot, multipliers.length, 0, () => {
        const winAmount = betAmount * maxMultiplier;
        balance += winAmount;
        playWinSound(winAmount);
        updateBalance();
        showToast(`🍀 Lucky Plinko! Won $${winAmount.toFixed(2)} (${maxMultiplier}x)`, 'success');
    });
}

// Mines powerup
function useMineDetector() {
    if (!minesGameActive) {
        showToast('Start a mines game first!', 'error');
        return;
    }

    if (upgrades.minesReveal <= 0) {
        showToast('No Mine Detector available!', 'error');
        return;
    }

    upgrades.minesReveal--;
    const displayElement = document.getElementById('upgrade-minesReveal');
    if (displayElement) {
        displayElement.textContent = upgrades.minesReveal;
    }

    if (upgrades.minesReveal === 0) {
        document.getElementById('mine-detector-btn').style.display = 'none';
    }

    // Reveal one mine
    if (minePositions.length > 0) {
        const randomMine = minePositions[Math.floor(Math.random() * minePositions.length)];
        const tile = document.querySelector(`[data-index="${randomMine}"]`);
        
        if (tile && !tile.classList.contains('revealed')) {
            tile.classList.add('revealed', 'bomb');
            tile.textContent = '💣';
            tile.style.opacity = '0.5';
            showToast('💎 Mine Detector revealed a mine!', 'success');
        } else {
            showToast('That mine was already revealed!', 'info');
        }
    }
}

// Limbo powerup
function useLimboBoost() {
    if (upgrades.limboBoost <= 0) {
        showToast('No Limbo Boost available!', 'error');
        return;
    }

    upgrades.limboBoost--;
    const displayElement = document.getElementById('upgrade-limboBoost');
    if (displayElement) {
        displayElement.textContent = upgrades.limboBoost;
    }

    if (upgrades.limboBoost === 0) {
        document.getElementById('limbo-boost-btn').style.display = 'none';
    }

    const betAmount = parseFloat(document.getElementById('limbo-bet').value);
    let targetMultiplier = parseFloat(document.getElementById('limbo-target').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.limboBoost++; // Refund
        if (displayElement) displayElement.textContent = upgrades.limboBoost;
        document.getElementById('limbo-boost-btn').style.display = 'block';
        return;
    }
    
    if (isNaN(targetMultiplier) || targetMultiplier < 1.01) {
        showToast('Target must be at least 1.01x', 'error');
        upgrades.limboBoost++; // Refund
        if (displayElement) displayElement.textContent = upgrades.limboBoost;
        document.getElementById('limbo-boost-btn').style.display = 'block';
        return;
    }
    
    // Cap the multiplier at 10x to prevent abuse
    if (targetMultiplier > 10) {
        targetMultiplier = 10;
        showToast('⚡ Limbo Boost capped at 10x!', 'info');
    }
    
    balance -= betAmount;
    updateBalance();
    
    const resultDisplay = document.getElementById('limbo-result');
    const statusDisplay = document.getElementById('limbo-status');
    
    // Guaranteed to hit target (capped at 10x)
    const result = targetMultiplier;
    
    resultDisplay.textContent = result.toFixed(2) + 'x';
    resultDisplay.style.color = '#00e701';
    
    const winAmount = betAmount * targetMultiplier;
    balance += winAmount;
    playWinSound(winAmount);
    statusDisplay.textContent = `⚡ Limbo Boost! Won $${winAmount.toFixed(2)}!`;
    statusDisplay.style.color = '#00e701';
    showToast(`⚡ Limbo Boost! Won $${winAmount.toFixed(2)}! (${targetMultiplier.toFixed(2)}x)`, 'success');
    
    updateBalance();
}

// Crash powerup
function useCrashInsurance() {
    if (upgrades.crashSafety <= 0) {
        showToast('No Crash Insurance available!', 'error');
        return;
    }

    showToast('🛡️ Crash Insurance will activate on your next bet!', 'info');
    // The actual logic would be implemented in the crash game
    // For now, just consume the upgrade
    upgrades.crashSafety--;
    const displayElement = document.getElementById('upgrade-crashSafety');
    if (displayElement) {
        displayElement.textContent = upgrades.crashSafety;
    }

    if (upgrades.crashSafety === 0) {
        document.getElementById('crash-insurance-btn').style.display = 'none';
    }
}

// Roulette powerup
function useRouletteVision() {
    if (upgrades.rouletteVision <= 0) {
        showToast('No Roulette Vision available!', 'error');
        return;
    }

    showToast('🔮 Roulette Vision will activate on your next spin!', 'info');
    // The actual logic would be implemented in the roulette game
    // For now, just consume the upgrade
    upgrades.rouletteVision--;
    const displayElement = document.getElementById('upgrade-rouletteVision');
    if (displayElement) {
        displayElement.textContent = upgrades.rouletteVision;
    }

    if (upgrades.rouletteVision === 0) {
        document.getElementById('roulette-vision-btn').style.display = 'none';
    }
}

// Slots powerup
function useLuckySlots() {
    if (upgrades.slotsLuck <= 0) {
        showToast('No Lucky Slots available!', 'error');
        return;
    }

    upgrades.slotsLuck--;
    const displayElement = document.getElementById('upgrade-slotsLuck');
    if (displayElement) {
        displayElement.textContent = upgrades.slotsLuck;
    }

    if (upgrades.slotsLuck === 0) {
        document.getElementById('lucky-slots-btn').style.display = 'none';
    }

    const betAmount = parseFloat(document.getElementById('slots-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.slotsLuck++; // Refund
        if (displayElement) displayElement.textContent = upgrades.slotsLuck;
        document.getElementById('lucky-slots-btn').style.display = 'block';
        return;
    }

    // Check which variant is selected
    const slotsVariant = document.getElementById('slots-variant').value;
    
    if (slotsVariant === '3x5') {
        useLuckySlots3x5(betAmount);
    } else {
        useLuckySlots3x3(betAmount);
    }
}

function useLuckySlots3x3(betAmount) {
    balance -= betAmount;
    updateBalance();

    playSound('slotsSpin');

    const symbols = ['🍒', '⭐', '💎', '7️⃣', '🔔'];
    const reels = [
        document.getElementById('slot-reel-1'),
        document.getElementById('slot-reel-2'),
        document.getElementById('slot-reel-3')
    ];
    const resultDiv = document.getElementById('slots-result');

    // Guaranteed 3 of a kind - pick a random symbol
    const luckySymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const results = [luckySymbol, luckySymbol, luckySymbol];

    // Animate reels
    reels.forEach(reel => {
        reel.classList.remove('stopped', 'winning');
        reel.classList.add('spinning');
    });

    const spinInterval = setInterval(() => {
        reels.forEach((reel) => {
            if (reel.classList.contains('spinning')) {
                reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }
        });
    }, 50);

    // Stop reels one by one
    setTimeout(() => {
        reels[0].textContent = results[0];
        reels[0].classList.remove('spinning');
        reels[0].classList.add('stopped');
        playSound('ding');
    }, 1200);

    setTimeout(() => {
        reels[1].textContent = results[1];
        reels[1].classList.remove('spinning');
        reels[1].classList.add('stopped');
        playSound('ding');
    }, 2400);

    setTimeout(() => {
        clearInterval(spinInterval);
        reels[2].textContent = results[2];
        reels[2].classList.remove('spinning');
        reels[2].classList.add('stopped');
        playSound('ding');

        setTimeout(() => {
            playSound('jackpot');
            
            let multiplier = 10;
            if (luckySymbol === '7️⃣') {
                multiplier = 100;
                // Play 777 track for lucky slots too
const track777 = jackpotTrack.cloneNode();
                if (track777) {
                    const currentMusic = currentTrack ? musicTracks[currentTrack] : null;
                    const originalVolume = currentMusic ? currentMusic.volume : 0;

                    if (currentMusic && !currentMusic.paused) {
                        currentMusic.pause();
                    }

                    track777.pause();
                    // Random start time between 0 and track duration minus 5 seconds
                    track777.currentTime = Math.random() * Math.max(0, track777.duration - 5) || Math.random() * 120;
                    track777.volume = 0;
                    track777.play().catch(e => console.log('777 track failed:', e));

                    // Fade in
                    let fadeInInterval = setInterval(() => {
                        if (track777.volume < 0.45) {
                            track777.volume += 0.05;
                        } else {
                            track777.volume = 0.5;
                            clearInterval(fadeInInterval);
                        }
                    }, 50);

                    setTimeout(() => {
                        // Fade out
                        let fadeOutInterval = setInterval(() => {
                            if (track777.volume > 0.05) {
                                track777.volume -= 0.05;
                            } else {
                                track777.pause();
                                track777.currentTime = 0;
                                clearInterval(fadeOutInterval);
                                if (currentMusic && originalVolume > 0) {
                                    currentMusic.volume = originalVolume;
                                    currentMusic.play();
                                }
                            }
                        }, 50);
                    }, 5000);
                }
            }
            else if (luckySymbol === '�') multiplier = 50;
            else if (luckySymbol === '⭐') multiplier = 25;
            else if (luckySymbol === '🔔') multiplier = 15;
            else if (luckySymbol === '🍒') multiplier = 10;

            const winAmount = betAmount * multiplier;
            balance += winAmount;
            playWinSound(winAmount);
            resultDiv.textContent = `🍀 Lucky Slots! Won ${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`;
            resultDiv.style.color = '#00e701';
            resultDiv.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
            showToast(`🍀 Lucky Slots! Won ${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`, 'success');

            const slotsDisplay = document.querySelector('.slots-result-display');
            addWinEffect(slotsDisplay);
            createParticles('+$' + (winAmount - betAmount).toFixed(2), '#00e701');
            createConfetti();

            if (luckySymbol === '7️⃣') {
                reels.forEach(reel => {
                    reel.classList.add('rainbow-glow');
                    setTimeout(() => reel.classList.remove('rainbow-glow'), 3000);
                });
            }

            updateBalance();

            setTimeout(() => {
                resultDiv.style.textShadow = '0 0 10px rgba(0, 231, 1, 0.6), 0 0 20px rgba(0, 231, 1, 0.3)';
            }, 2000);
        }, 300);
    }, 3600);
}

function useLuckySlots3x5(betAmount) {
    balance -= betAmount;
    updateBalance();

    playSound('slotsSpin');

    const symbols = ['🍒', '⭐', '💎', '7️⃣', '🔔'];
    const resultDiv = document.getElementById('slots-result');

    // Guaranteed 5 of a kind on middle row - pick a random symbol
    const luckySymbol = symbols[Math.floor(Math.random() * symbols.length)];

    // Create 3x5 grid with guaranteed middle row win
    const grid = [];
    for (let row = 0; row < 3; row++) {
        grid[row] = [];
        for (let col = 0; col < 5; col++) {
            if (row === 1) {
                // Middle row - all same symbol
                grid[row][col] = luckySymbol;
            } else {
                // Other rows - random
                grid[row][col] = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }
    }

    // Get all reel elements
    const reels = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
            const reel = document.getElementById(`slot-reel-${row}-${col}`);
            if (reel) {
                reels.push({ element: reel, row, col });
                reel.classList.remove('stopped', 'winning');
                reel.classList.add('spinning');
            }
        }
    }

    // Animate spinning
    const spinInterval = setInterval(() => {
        reels.forEach(({ element }) => {
            if (element.classList.contains('spinning')) {
                element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }
        });
    }, 50);

    // Stop reels column by column
    for (let col = 0; col < 5; col++) {
        setTimeout(() => {
            for (let row = 0; row < 3; row++) {
                const reel = document.getElementById(`slot-reel-${row}-${col}`);
                if (reel) {
                    reel.textContent = grid[row][col];
                    reel.classList.remove('spinning');
                    reel.classList.add('stopped');
                }
            }
            playSound('ding');

            // On last column
            if (col === 4) {
                clearInterval(spinInterval);

                setTimeout(() => {
                    playSound('jackpot');

                    let multiplier = 50; // Base for 5 of a kind
                    if (luckySymbol === '7️⃣') {
                        multiplier = 500;
                        // Play 777 track
                        const track777 = jackpotTrack.cloneNode();
                        if (track777) {
                            const currentMusic = currentTrack ? musicTracks[currentTrack] : null;
                            const originalVolume = currentMusic ? currentMusic.volume : 0;

                            if (currentMusic && !currentMusic.paused) {
                                currentMusic.pause();
                            }

                            track777.pause();
                            // Random start time between 0 and track duration minus 5 seconds
                            track777.currentTime = Math.random() * Math.max(0, track777.duration - 5) || Math.random() * 120;
                            track777.volume = 0;
                            track777.play().catch(e => console.log('777 track failed:', e));

                            // Fade in
                            let fadeInInterval = setInterval(() => {
                                if (track777.volume < 0.45) {
                                    track777.volume += 0.05;
                                } else {
                                    track777.volume = 0.5;
                                    clearInterval(fadeInInterval);
                                }
                            }, 50);

                            setTimeout(() => {
                                // Fade out
                                let fadeOutInterval = setInterval(() => {
                                    if (track777.volume > 0.05) {
                                        track777.volume -= 0.05;
                                    } else {
                                        track777.pause();
                                        track777.currentTime = 0;
                                        clearInterval(fadeOutInterval);
                                        if (currentMusic && originalVolume > 0) {
                                            currentMusic.volume = originalVolume;
                                            currentMusic.play();
                                        }
                                    }
                                }, 50);
                            }, 5000);
                        }
                    }
                    else if (luckySymbol === '💎') multiplier = 250;
                    else if (luckySymbol === '⭐') multiplier = 125;
                    else if (luckySymbol === '🔔') multiplier = 75;
                    else if (luckySymbol === '🍒') multiplier = 50;

                    const winAmount = betAmount * multiplier;
                    balance += winAmount;
                    playWinSound(winAmount);
                    resultDiv.textContent = `🍀 Lucky Slots! Won ${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`;
                    resultDiv.style.color = '#00e701';
                    resultDiv.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
                    showToast(`🍀 Lucky Slots! Won ${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`, 'success');

                    const slotsDisplay = document.querySelector('.slots-result-display');
                    addWinEffect(slotsDisplay);
                    createParticles('+' + (winAmount - betAmount).toFixed(2), '#00e701');
                    createConfetti();

                    if (luckySymbol === '7️⃣') {
                        for (let col = 0; col < 5; col++) {
                            const reel = document.getElementById(`slot-reel-1-${col}`);
                            if (reel) {
                                reel.classList.add('rainbow-glow');
                                setTimeout(() => reel.classList.remove('rainbow-glow'), 3000);
                            }
                        }
                    }

                    updateBalance();

                    setTimeout(() => {
                        resultDiv.style.textShadow = '0 0 10px rgba(0, 231, 1, 0.6), 0 0 20px rgba(0, 231, 1, 0.3)';
                    }, 2000);
                }, 300);
            }
        }, 1200 * (col + 1));
    }
}

// Blackjack powerup
function useCardPeek() {
    if (!bjGameActive) {
        showToast('Deal a hand first!', 'error');
        return;
    }

    if (upgrades.blackjackPeek <= 0) {
        showToast('No Card Peek available!', 'error');
        return;
    }

    upgrades.blackjackPeek--;
    const displayElement = document.getElementById('upgrade-blackjackPeek');
    if (displayElement) {
        displayElement.textContent = upgrades.blackjackPeek;
    }

    if (upgrades.blackjackPeek === 0) {
        document.getElementById('card-peek-btn').style.display = 'none';
    }

    // Reveal dealer's hidden card temporarily
    if (bjDealerHand.length >= 2) {
        const hiddenCard = bjDealerHand[1];
        showToast(`👁️ Dealer's hidden card: ${hiddenCard.value}${hiddenCard.suit}`, 'info');
    }
}

function useBlackjackCounter() {
    if (upgrades.blackjackCounter <= 0) {
        showToast('No Card Counter available!', 'error');
        return;
    }

    upgrades.blackjackCounter--;
    const displayElement = document.getElementById('upgrade-blackjackCounter');
    if (displayElement) {
        displayElement.textContent = upgrades.blackjackCounter;
    }

    if (upgrades.blackjackCounter === 0) {
        document.getElementById('blackjack-counter-btn').style.display = 'none';
    }

    const betAmount = parseFloat(document.getElementById('blackjack-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.blackjackCounter++;
        if (displayElement) displayElement.textContent = upgrades.blackjackCounter;
        document.getElementById('blackjack-counter-btn').style.display = 'block';
        return;
    }

    balance -= betAmount;
    updateBalance();

    // Guaranteed blackjack win
    bjGameActive = true;
    bjDealerHand = [
        { value: '10', suit: '♠' },
        { value: '6', suit: '♥' }
    ];
    bjPlayerHand = [
        { value: 'A', suit: '♠' },
        { value: 'K', suit: '♦' }
    ];
    bjBet = betAmount;

    updateBlackjackDisplay();

    // Auto-win with blackjack
    setTimeout(() => {
        const winAmount = betAmount * 2.5; // Blackjack pays 3:2
        balance += winAmount;
        playWinSound(winAmount);
        updateBalance();
        
        const resultDiv = document.querySelector('.blackjack-result-display');
        resultDiv.innerHTML = `<div style="color: #00e701; font-size: 24px; text-shadow: 0 0 20px #00e701;">🎯 BLACKJACK! Won ${(winAmount - betAmount).toFixed(2)}!</div>`;
        
        showToast(`🎯 Card Counter! Blackjack! Won ${(winAmount - betAmount).toFixed(2)}!`, 'success');
        createConfetti();
        
        bjGameActive = false;
        document.getElementById('blackjack-deal-btn').style.display = 'inline-block';
        document.getElementById('blackjack-hit-btn').style.display = 'none';
        document.getElementById('blackjack-stand-btn').style.display = 'none';
        document.getElementById('blackjack-split-btn').style.display = 'none';
    }, 1000);
}

// Tower powerup
function useTowerShield() {
    if (!towerActive) {
        showToast('Start a tower game first!', 'error');
        return;
    }

    if (upgrades.towerShield <= 0) {
        showToast('No Tower Shield available!', 'error');
        return;
    }

    upgrades.towerShield--;
    const displayElement = document.getElementById('upgrade-towerShield');
    if (displayElement) {
        displayElement.textContent = upgrades.towerShield;
    }

    if (upgrades.towerShield === 0) {
        document.getElementById('tower-shield-btn').style.display = 'none';
    }

    showToast('🛡️ Tower Shield Active! Next mistake will be forgiven!', 'success');
    // Set a flag that will be checked in clickTowerTile
    window.towerShieldActive = true;
}

function useTowerVision() {
    if (!towerActive) {
        showToast('Start a tower game first!', 'error');
        return;
    }

    if (upgrades.towerVision <= 0) {
        showToast('No Tower Vision available!', 'error');
        return;
    }

    upgrades.towerVision--;
    const displayElement = document.getElementById('upgrade-towerVision');
    if (displayElement) {
        displayElement.textContent = upgrades.towerVision;
    }

    if (upgrades.towerVision === 0) {
        document.getElementById('tower-vision-btn').style.display = 'none';
    }

    // Reveal safe tiles for current row
    const currentRowTiles = towerSafeTiles[towerCurrentRow];
    if (currentRowTiles && currentRowTiles.length > 0) {
        currentRowTiles.forEach(col => {
            const tile = document.querySelector(`[data-row="${towerCurrentRow}"][data-col="${col}"]`);
            if (tile && !tile.classList.contains('revealed')) {
                tile.style.border = '2px solid #00e701';
                tile.style.boxShadow = '0 0 20px #00e701';
            }
        });
        showToast('👁️ Tower Vision revealed safe tiles!', 'success');
    } else {
        showToast('👁️ Tower Vision activated!', 'info');
    }
}

// Keno powerup
function useKenoOracle() {
    if (upgrades.kenoOracle <= 0) {
        showToast('No Keno Oracle available!', 'error');
        return;
    }

    upgrades.kenoOracle--;
    const displayElement = document.getElementById('upgrade-kenoOracle');
    if (displayElement) {
        displayElement.textContent = upgrades.kenoOracle;
    }

    if (upgrades.kenoOracle === 0) {
        document.getElementById('keno-oracle-btn').style.display = 'none';
    }

    showToast('🔮 Keno Oracle will reveal 2 winning numbers on your next play!', 'info');
    // The oracle logic would be implemented in the keno game
}

// Coin Flip powerup
function useBiasedCoin() {
    if (upgrades.coinBias <= 0) {
        showToast('No Biased Coin available!', 'error');
        return;
    }

    upgrades.coinBias--;
    const displayElement = document.getElementById('upgrade-coinBias');
    if (displayElement) {
        displayElement.textContent = upgrades.coinBias;
    }

    if (upgrades.coinBias === 0) {
        document.getElementById('biased-coin-btn').style.display = 'none';
    }

    const betAmount = parseFloat(document.getElementById('coinflip-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.coinBias++; // Refund
        if (displayElement) displayElement.textContent = upgrades.coinBias;
        document.getElementById('biased-coin-btn').style.display = 'block';
        return;
    }

    balance -= betAmount;
    updateBalance();

    playSound('coinFlip');

    // 70% chance to win
    const result = Math.random() < 0.7 ? selectedCoin : (selectedCoin === 'heads' ? 'tails' : 'heads');
    const coin = document.getElementById('coin');
    const resultDisplay = document.getElementById('coin-result');

    coin.classList.remove('flipping-heads', 'flipping-tails');
    coin.style.transform = 'rotateY(0deg)';
    resultDisplay.textContent = '';

    setTimeout(() => {
        if (result === 'heads') {
            coin.classList.add('flipping-heads');
        } else {
            coin.classList.add('flipping-tails');
        }
    }, 10);

    setTimeout(() => {
        resultDisplay.textContent = result.toUpperCase();

        coin.classList.remove('flipping-heads', 'flipping-tails');
        if (result === 'heads') {
            coin.style.transform = 'rotateY(0deg)';
        } else {
            coin.style.transform = 'rotateY(180deg)';
        }

        if (result === selectedCoin) {
            const winAmount = betAmount * 2;
            balance += winAmount;
            playWinSound(winAmount);
            resultDisplay.style.color = '#00e701';
            resultDisplay.classList.add('scale-pop');
            showToast(`🧲 Biased Coin! Won $${winAmount.toFixed(2)}!`, 'success');

            const coinDisplay = document.querySelector('.coin-result-display');
            addWinEffect(coinDisplay);
            createParticles('+$' + winAmount.toFixed(2), '#00e701');
        } else {
            playSound('lose');
            resultDisplay.style.color = '#ff4757';
            resultDisplay.classList.add('lose-shake');
            showToast(`Lost $${betAmount.toFixed(2)}`, 'error');

            const coinDisplay = document.querySelector('.coin-result-display');
            addLoseEffect(coinDisplay);
            createParticles('-$' + betAmount.toFixed(2), '#ff4757');
        }
        updateBalance();

        setTimeout(() => {
            resultDisplay.classList.remove('scale-pop', 'lose-shake');
        }, 500);
    }, 1500);
}



// Additional powerup functions for second upgrades

function usePlinkoMagnet() {
    if (upgrades.plinkoMagnet <= 0) {
        showToast('No Plinko Magnet available!', 'error');
        return;
    }
    upgrades.plinkoMagnet--;
    const displayElement = document.getElementById('upgrade-plinkoMagnet');
    if (displayElement) displayElement.textContent = upgrades.plinkoMagnet;
    if (upgrades.plinkoMagnet === 0) document.getElementById('plinko-magnet-btn').style.display = 'none';
    showToast('🎯 Plinko Magnet active on next drop!', 'info');
    useLuckyPlinko(); // Reuse lucky plinko logic
}

function useMineShield() {
    if (!minesGameActive) {
        showToast('Start a mines game first!', 'error');
        return;
    }
    if (upgrades.minesShield <= 0) {
        showToast('No Mine Shield available!', 'error');
        return;
    }
    upgrades.minesShield--;
    const displayElement = document.getElementById('upgrade-minesShield');
    if (displayElement) displayElement.textContent = upgrades.minesShield;
    if (upgrades.minesShield === 0) document.getElementById('mine-shield-btn').style.display = 'none';
    showToast('🛡️ Mine Shield Active! Next mine hit forgiven!', 'success');
    window.mineShieldActive = true;
}

function useMoonShot() {
    if (upgrades.crashMoon <= 0) {
        showToast('No Moon Shot available!', 'error');
        return;
    }
    upgrades.crashMoon--;
    const displayElement = document.getElementById('upgrade-crashMoon');
    if (displayElement) displayElement.textContent = upgrades.crashMoon;
    if (upgrades.crashMoon === 0) document.getElementById('moon-shot-btn').style.display = 'none';
    showToast('🚀 Moon Shot active on next crash!', 'info');
}

function useLimboPrecision() {
    if (upgrades.limboPrecision <= 0) {
        showToast('No Limbo Precision available!', 'error');
        return;
    }
    upgrades.limboPrecision--;
    const displayElement = document.getElementById('upgrade-limboPrecision');
    if (displayElement) displayElement.textContent = upgrades.limboPrecision;
    if (upgrades.limboPrecision === 0) document.getElementById('limbo-precision-btn').style.display = 'none';

    const betAmount = parseFloat(document.getElementById('limbo-bet').value);
    let targetMultiplier = parseFloat(document.getElementById('limbo-target').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.limboPrecision++;
        if (displayElement) displayElement.textContent = upgrades.limboPrecision;
        document.getElementById('limbo-precision-btn').style.display = 'block';
        return;
    }
    
    if (isNaN(targetMultiplier) || targetMultiplier < 1.01) {
        showToast('Target must be at least 1.01x', 'error');
        upgrades.limboPrecision++;
        if (displayElement) displayElement.textContent = upgrades.limboPrecision;
        document.getElementById('limbo-precision-btn').style.display = 'block';
        return;
    }
    
    if (targetMultiplier > 5) {
        targetMultiplier = 5;
        showToast('🎯 Limbo Precision capped at 5x!', 'info');
    }
    
    balance -= betAmount;
    updateBalance();
    
    const resultDisplay = document.getElementById('limbo-result');
    const statusDisplay = document.getElementById('limbo-status');
    
    resultDisplay.textContent = targetMultiplier.toFixed(2) + 'x';
    resultDisplay.style.color = '#00e701';
    
    const winAmount = betAmount * targetMultiplier;
    balance += winAmount;
    playWinSound(winAmount);
    statusDisplay.textContent = `🎯 Limbo Precision! Won $${winAmount.toFixed(2)}!`;
    statusDisplay.style.color = '#00e701';
    showToast(`🎯 Limbo Precision! Won $${winAmount.toFixed(2)}! (${targetMultiplier.toFixed(2)}x)`, 'success');
    
    updateBalance();
}

function useWheelMagnet() {
    if (upgrades.rouletteMagnet <= 0) {
        showToast('No Wheel Magnet available!', 'error');
        return;
    }
    upgrades.rouletteMagnet--;
    const displayElement = document.getElementById('upgrade-rouletteMagnet');
    if (displayElement) displayElement.textContent = upgrades.rouletteMagnet;
    if (upgrades.rouletteMagnet === 0) document.getElementById('wheel-magnet-btn').style.display = 'none';
    showToast('🧲 Wheel Magnet active on next spin!', 'info');
}

function useDiamondReels() {
    if (upgrades.slotsDiamond <= 0) {
        showToast('No Diamond Reels available!', 'error');
        return;
    }
    upgrades.slotsDiamond--;
    const displayElement = document.getElementById('upgrade-slotsDiamond');
    if (displayElement) displayElement.textContent = upgrades.slotsDiamond;
    if (upgrades.slotsDiamond === 0) document.getElementById('diamond-reels-btn').style.display = 'none';
    showToast('💎 Diamond Reels active! Spinning...', 'info');
    useLuckySlots(); // Reuse lucky slots logic
}

function useKenoMaster() {
    if (upgrades.kenoMaster <= 0) {
        showToast('No Keno Master available!', 'error');
        return;
    }
    upgrades.kenoMaster--;
    const displayElement = document.getElementById('upgrade-kenoMaster');
    if (displayElement) displayElement.textContent = upgrades.kenoMaster;
    if (upgrades.kenoMaster === 0) document.getElementById('keno-master-btn').style.display = 'none';
    showToast('🎯 Keno Master active on next play!', 'info');
}

function useLuckyCoin() {
    if (upgrades.coinLucky <= 0) {
        showToast('No Lucky Coin available!', 'error');
        return;
    }
    upgrades.coinLucky--;
    const displayElement = document.getElementById('upgrade-coinLucky');
    if (displayElement) displayElement.textContent = upgrades.coinLucky;
    if (upgrades.coinLucky === 0) document.getElementById('lucky-coin-btn').style.display = 'none';

    const betAmount = parseFloat(document.getElementById('coinflip-bet').value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        upgrades.coinLucky++;
        if (displayElement) displayElement.textContent = upgrades.coinLucky;
        document.getElementById('lucky-coin-btn').style.display = 'block';
        return;
    }

    balance -= betAmount;
    updateBalance();
    playSound('coinFlip');

    const result = Math.random() < 0.6 ? selectedCoin : (selectedCoin === 'heads' ? 'tails' : 'heads');
    const coin = document.getElementById('coin');
    const resultDisplay = document.getElementById('coin-result');

    coin.classList.remove('flipping-heads', 'flipping-tails');
    coin.style.transform = 'rotateY(0deg)';
    resultDisplay.textContent = '';

    setTimeout(() => {
        if (result === 'heads') coin.classList.add('flipping-heads');
        else coin.classList.add('flipping-tails');
    }, 10);

    setTimeout(() => {
        resultDisplay.textContent = result.toUpperCase();
        coin.classList.remove('flipping-heads', 'flipping-tails');
        if (result === 'heads') coin.style.transform = 'rotateY(0deg)';
        else coin.style.transform = 'rotateY(180deg)';

        if (result === selectedCoin) {
            const winAmount = betAmount * 2;
            balance += winAmount;
            playWinSound(winAmount);
            resultDisplay.style.color = '#00e701';
            resultDisplay.classList.add('scale-pop');
            showToast(`🍀 Lucky Coin! Won $${winAmount.toFixed(2)}!`, 'success');
            const coinDisplay = document.querySelector('.coin-result-display');
            addWinEffect(coinDisplay);
            createParticles('+$' + winAmount.toFixed(2), '#00e701');
        } else {
            playSound('lose');
            resultDisplay.style.color = '#ff4757';
            resultDisplay.classList.add('lose-shake');
            showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
            const coinDisplay = document.querySelector('.coin-result-display');
            addLoseEffect(coinDisplay);
            createParticles('-$' + betAmount.toFixed(2), '#ff4757');
        }
        updateBalance();
        setTimeout(() => resultDisplay.classList.remove('scale-pop', 'lose-shake'), 500);
    }, 1500);
}


// ===== VFX SYSTEM =====
function createParticles(text, color) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = text;
    particle.style.color = color;
    particle.style.left = (window.innerWidth / 2) + 'px';
    particle.style.top = (window.innerHeight / 2) + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

function addWinEffect(element) {
    element.classList.add('win-flash');
    setTimeout(() => element.classList.remove('win-flash'), 1000);
}

function addLoseEffect(element) {
    element.classList.add('lose-shake');
    setTimeout(() => element.classList.remove('lose-shake'), 300);
}

function createConfetti() {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
    const confettiCount = 30; // Reduced from 50
    const fragment = document.createDocumentFragment(); // Use fragment for better performance
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%'; // Use percentage instead of pixels
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = (Math.random() * 0.3) + 's';
        confetti.style.willChange = 'transform'; // Optimize animation
        
        fragment.appendChild(confetti);
    }
    
    document.body.appendChild(fragment);
    
    // Remove all confetti at once after animation
    setTimeout(() => {
        document.querySelectorAll('.confetti').forEach(c => c.remove());
    }, 2000);
}

// Initialize stocks when game loads
if (currentGame === 'stocks') {
    setTimeout(() => initStocks(), 100);
}










// ===== HI-LO GAME =====
createTowerGrid();

// ===== SLOTS GAME =====
let slotsOnCooldown = false;
let slotsVariant = '3x3'; // Default variant

function changeSlotsVariant() {
    slotsVariant = document.getElementById('slots-variant').value;
    const container = document.getElementById('slots-reels-container');
    container.innerHTML = '';
    
    if (slotsVariant === '3x3') {
        // Classic 3 reels
        container.className = 'slots-reels';
        for (let i = 1; i <= 3; i++) {
            const reel = document.createElement('div');
            reel.className = 'slot-reel';
            reel.id = `slot-reel-${i}`;
            reel.textContent = ['🍒', '⭐', '💎'][i - 1];
            container.appendChild(reel);
        }
    } else {
        // Modern 3x5 grid
        container.className = 'slots-reels-grid';
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                const reel = document.createElement('div');
                reel.className = 'slot-reel-small';
                reel.id = `slot-reel-${row}-${col}`;
                reel.textContent = ['🍒', '⭐', '💎', '🔔', '7️⃣'][col];
                container.appendChild(reel);
            }
        }
    }
}

function playSlots() {
    if (slotsOnCooldown) {
        showToast('Wait for reels to stop spinning', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('slots-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    if (slotsVariant === '3x5') {
        playSlots3x5(betAmount);
    } else {
        playSlots3x3(betAmount);
    }
}

function playSlots3x3(betAmount) {
    slotsOnCooldown = true;
    balance -= betAmount;
    trackBet('slots', betAmount);
    updateBalance();

    // Play slots spin sound
    playSound('slotsSpin');

    const symbols = ['🍒', '⭐', '💎', '7️⃣', '🔔'];
    const reels = [
        document.getElementById('slot-reel-1'),
        document.getElementById('slot-reel-2'),
        document.getElementById('slot-reel-3')
    ];
    const resultDiv = document.getElementById('slots-result');

    // Generate final results
    const results = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Remove any previous classes and add spinning to all reels
    reels.forEach(reel => {
        reel.classList.remove('stopped', 'winning');
        reel.classList.add('spinning');
    });

    // Spin all reels - only update reels that are still spinning
    const spinInterval = setInterval(() => {
        reels.forEach((reel) => {
            if (reel.classList.contains('spinning')) {
                reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }
        });
    }, 50);

    // Stop reel 1 after 1.2 seconds
    setTimeout(() => {
        reels[0].classList.remove('spinning');
        reels[0].classList.add('stopped');
        reels[0].textContent = results[0];
        playSound('ding');

        // Remove stopped class after animation
        setTimeout(() => {
            reels[0].classList.remove('stopped');
        }, 300);
    }, 1200);

    // Stop reel 2 after 2.4 seconds
    setTimeout(() => {
        reels[1].classList.remove('spinning');
        reels[1].classList.add('stopped');
        reels[1].textContent = results[1];
        playSound('ding');

        setTimeout(() => {
            reels[1].classList.remove('stopped');
        }, 300);
    }, 2400);

    // Stop reel 3 after 3.6 seconds (matches sound duration)
    setTimeout(() => {
        clearInterval(spinInterval);
        reels[2].classList.remove('spinning');
        reels[2].classList.add('stopped');
        reels[2].textContent = results[2];
        playSound('ding');

        setTimeout(() => {
            reels[2].classList.remove('stopped');
        }, 300);

        // Small delay before evaluating
        setTimeout(() => {
            evaluateSlotsResult(results, betAmount, reels, resultDiv);
            // Release cooldown after evaluation completes
            setTimeout(() => {
                slotsOnCooldown = false;
            }, 500);
        }, 300);
    }, 3600);
}

function evaluateSlotsResult(results, betAmount, reels, resultDiv) {
    // Check for wins
    let multiplier = 0;
    let isWin = false;

    if (results[0] === results[1] && results[1] === results[2]) {
        // Three of a kind - JACKPOT!
        isWin = true;
        playSound('jackpot');

        if (results[0] === '7️⃣') {
            multiplier = 100;
            // Play track 777 for 5 seconds
            const track777 = jackpotTrack.cloneNode();
            const currentMusic = musicEnabled && currentTrack ? musicTracks[currentTrack] : null;
            const originalVolume = currentMusic ? currentMusic.volume : 0;

            // Fade out current music
            if (currentMusic && !currentMusic.paused) {
                let fadeOut = setInterval(() => {
                    if (currentMusic.volume > 0.05) {
                        currentMusic.volume -= 0.05;
                    } else {
                        currentMusic.volume = 0;
                        currentMusic.pause();
                        clearInterval(fadeOut);
                    }
                }, 50);
            }

            // Play 777 track from random position for 5 seconds with fade
            track777.pause();
            // Random start time between 0 and track duration minus 5 seconds
            track777.currentTime = Math.random() * Math.max(0, track777.duration - 5) || Math.random() * 120;
            track777.volume = 0;
            track777.play().catch(e => {
                console.log('777 track failed:', e);
                // Fallback to jackpot sound if track fails
                playSound('jackpot');
            });

            // Fade in
            let fadeIn777 = setInterval(() => {
                if (track777.volume < 0.45) {
                    track777.volume += 0.05;
                } else {
                    track777.volume = 0.5;
                    clearInterval(fadeIn777);
                }
            }, 50);

            setTimeout(() => {
                // Fade out 777 track
                let fadeOut777 = setInterval(() => {
                    if (track777.volume > 0.05) {
                        track777.volume -= 0.05;
                    } else {
                        track777.pause();
                        track777.currentTime = 0;
                        clearInterval(fadeOut777);

                        // Resume original music
                        if (currentMusic && originalVolume > 0) {
                            currentMusic.volume = 0;
                            currentMusic.play();
                            let fadeIn = setInterval(() => {
                                if (currentMusic.volume < originalVolume - 0.05) {
                                    currentMusic.volume += 0.05;
                                } else {
                                    currentMusic.volume = originalVolume;
                                    clearInterval(fadeIn);
                                }
                            }, 50);
                        }
                    }
                }, 50);
            }, 5000);
        }
        else if (results[0] === '💎') multiplier = 50;
        else if (results[0] === '⭐') multiplier = 25;
        else if (results[0] === '🔔') multiplier = 15;
        else if (results[0] === '🍒') multiplier = 10;
        else multiplier = 5;
    } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        // Two of a kind
        isWin = true;
        multiplier = 2;
    }

    if (isWin) {
    }

    if (multiplier > 0) {
        const winAmount = betAmount * multiplier;
        balance += winAmount;
        trackResult('slots', betAmount, winAmount);
        playWinSound(winAmount);
        resultDiv.textContent = `Won $${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`;
        resultDiv.style.color = '#00e701';
        resultDiv.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
        showToast(`Won $${(winAmount - betAmount).toFixed(2)}! (${multiplier}x)`, 'success');

        // Create particle effects
        createParticles('+$' + (winAmount - betAmount).toFixed(2), '#00e701');
        
        const slotsDisplay = document.querySelector('.slots-result-display');
        addWinEffect(slotsDisplay);
        
        // Add confetti for jackpots (3 of a kind)
        if (results[0] === results[1] && results[1] === results[2]) {
            createConfetti();
            // Track slots jackpots
            achievementStats.slotsJackpots++;
            checkAchievement('slotsMaster');
            // Add rainbow glow for 777 jackpot
            if (results[0] === '7️⃣') {
                reels.forEach(reel => {
                    reel.classList.add('rainbow-glow');
                    setTimeout(() => reel.classList.remove('rainbow-glow'), 3000);
                });
            }
        }

        setTimeout(() => {
            resultDiv.style.textShadow = '0 0 10px rgba(0, 231, 1, 0.6), 0 0 20px rgba(0, 231, 1, 0.3)';
        }, 2000);
    } else {
        playSound('lose');
        resultDiv.textContent = `Lost $${betAmount.toFixed(2)}`;
        resultDiv.style.color = '#ff4757';
        resultDiv.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';
        showToast(`Lost $${betAmount.toFixed(2)}`, 'error');

        createParticles('-$' + betAmount.toFixed(2), '#ff4757');

        setTimeout(() => {
            resultDiv.style.color = '#b1bad3';
            resultDiv.style.textShadow = 'none';
        }, 2000);
    }

    updateBalance();

    setTimeout(() => {
        resultDiv.textContent = '';
        resultDiv.style.color = '#b1bad3';
    }, 3000);
}

function playSlots3x5(betAmount) {
    slotsOnCooldown = true;
    balance -= betAmount;
    trackBet('slots', betAmount);
    updateBalance();

    playSound('slotsSpin');

    const symbols = ['🍒', '⭐', '💎', '7️⃣', '🔔'];
    const resultDiv = document.getElementById('slots-result');
    
    // Generate 3x5 grid results
    const gridResults = [];
    for (let row = 0; row < 3; row++) {
        gridResults[row] = [];
        for (let col = 0; col < 5; col++) {
            gridResults[row][col] = symbols[Math.floor(Math.random() * symbols.length)];
        }
    }

    // Get all reel elements
    const allReels = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
            const reel = document.getElementById(`slot-reel-${row}-${col}`);
            allReels.push(reel);
            reel.classList.remove('stopped', 'winning');
            reel.classList.add('spinning');
        }
    }

    // Spin animation
    const spinInterval = setInterval(() => {
        allReels.forEach(reel => {
            if (reel.classList.contains('spinning')) {
                reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            }
        });
    }, 50);

    // Stop columns one by one
    for (let col = 0; col < 5; col++) {
        setTimeout(() => {
            for (let row = 0; row < 3; row++) {
                const reel = document.getElementById(`slot-reel-${row}-${col}`);
                reel.classList.remove('spinning');
                reel.classList.add('stopped');
                reel.textContent = gridResults[row][col];
            }
            playSound('ding');
            
            if (col === 4) {
                clearInterval(spinInterval);
                setTimeout(() => {
                    evaluate3x5Slots(gridResults, betAmount, resultDiv);
                    setTimeout(() => {
                        slotsOnCooldown = false;
                    }, 500);
                }, 300);
            }
        }, 1200 + (col * 600));
    }
}

function evaluate3x5Slots(gridResults, betAmount, resultDiv) {
    let totalMultiplier = 0;
    const winningLines = [];

    // Check all 3 horizontal paylines (rows)
    for (let row = 0; row < 3; row++) {
        const line = gridResults[row];
        
        // Check for consecutive matching symbols from left to right
        const firstSymbol = line[0];
        let matchCount = 1;
        
        // Count consecutive matches from left
        for (let col = 1; col < 5; col++) {
            if (line[col] === firstSymbol) {
                matchCount++;
            } else {
                break; // Stop at first non-match
            }
        }
        
        // Award based on match count (3, 4, or 5)
        if (matchCount >= 3) {
            let lineMultiplier = 0;
            
            if (firstSymbol === '7️⃣') {
                if (matchCount === 5) lineMultiplier = 50;
                else if (matchCount === 4) lineMultiplier = 20;
                else lineMultiplier = 10;
            } else if (firstSymbol === '💎') {
                if (matchCount === 5) lineMultiplier = 25;
                else if (matchCount === 4) lineMultiplier = 10;
                else lineMultiplier = 5;
            } else if (firstSymbol === '⭐') {
                if (matchCount === 5) lineMultiplier = 15;
                else if (matchCount === 4) lineMultiplier = 6;
                else lineMultiplier = 3;
            } else if (firstSymbol === '🔔') {
                if (matchCount === 5) lineMultiplier = 10;
                else if (matchCount === 4) lineMultiplier = 4;
                else lineMultiplier = 2;
            } else if (firstSymbol === '🍒') {
                if (matchCount === 5) lineMultiplier = 8;
                else if (matchCount === 4) lineMultiplier = 3;
                else lineMultiplier = 1.5;
            }
            
            totalMultiplier += lineMultiplier;
            winningLines.push({ row, symbol: firstSymbol, count: matchCount, multiplier: lineMultiplier });
        }
    }

    if (totalMultiplier > 0) {
        const winAmount = betAmount * totalMultiplier;
        balance += winAmount;
        trackResult('slots', betAmount, winAmount);
        playWinSound(winAmount);
        
        resultDiv.textContent = `Won ${(winAmount - betAmount).toFixed(2)}! (${totalMultiplier}x)`;
        resultDiv.style.color = '#00e701';
        resultDiv.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
        showToast(`Won ${(winAmount - betAmount).toFixed(2)}! (${totalMultiplier}x)`, 'success');

        if (totalMultiplier >= 20) {
            createConfetti();
        }

        createParticles('+' + (winAmount - betAmount).toFixed(2), '#00e701');
        updateBalance();

        setTimeout(() => {
            resultDiv.style.textShadow = '0 0 10px rgba(0, 231, 1, 0.6), 0 0 20px rgba(0, 231, 1, 0.3)';
        }, 2000);
    } else {
        trackResult('slots', betAmount, 0);
        playSound('lose');
        resultDiv.textContent = `Lost ${betAmount.toFixed(2)}`;
        resultDiv.style.color = '#ff4757';
        resultDiv.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';
        showToast(`Lost ${betAmount.toFixed(2)}`, 'error');
        createParticles('-' + betAmount.toFixed(2), '#ff4757');

        setTimeout(() => {
            resultDiv.style.color = '#b1bad3';
            resultDiv.style.textShadow = 'none';
        }, 2000);
    }

    updateBalance();
}


// ===== BLACKJACK GAME =====
let bjDeck = [];
let bjPlayerHand = [];
let bjDealerHand = [];
let bjBetAmount = 0;
let bjGameActive = false;
let bjSplitHand = null;
let bjPlayingSplitHand = false;

function createBJDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit, color: (suit === '♥' || suit === '♦') ? 'red' : 'black' });
        }
    }
    
    return deck.sort(() => Math.random() - 0.5);
}

function getBJCardValue(card) {
    if (card.value === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    return parseInt(card.value);
}

function getBJHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    hand.forEach(card => {
        const cardValue = getBJCardValue(card);
        value += cardValue;
        if (card.value === 'A') aces++;
    });
    
    // Adjust for aces
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    
    return value;
}

function displayBJCard(card) {
    return `<div class="bj-card ${card.color}">${card.value}${card.suit}</div>`;
}

function dealBlackjack() {
    const betAmount = parseFloat(document.getElementById('blackjack-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    balance -= betAmount;
    blackjackBetAmount = betAmount;
    blackjackSplitBets = [betAmount];
    trackBet('blackjack', betAmount);
    updateBalance();

    // Initialize game
    blackjackDeck = shuffleBlackjackDeck(createBlackjackDeck());
    blackjackPlayerHands = [[drawBlackjackCard(), drawBlackjackCard()]];
    blackjackDealerHand = [drawBlackjackCard(), drawBlackjackCard()];
    blackjackGameActive = true;
    blackjackCanDouble = true;
    blackjackCurrentHandIndex = 0;
    blackjackCanSplit = canSplitHand(blackjackPlayerHands[0]);

    document.getElementById('blackjack-result').textContent = '';
    document.getElementById('blackjack-deal-btn').style.display = 'none';
    document.getElementById('blackjack-hit-btn').style.display = 'inline-block';
    document.getElementById('blackjack-stand-btn').style.display = 'inline-block';
    document.getElementById('blackjack-double-btn').style.display = 'inline-block';
    document.getElementById('blackjack-split-btn').style.display = blackjackCanSplit ? 'inline-block' : 'none';

    updateBlackjackDisplay();
    playSound('buttonClick');

    // Check for blackjack
    const playerValue = calculateBlackjackHandValue(blackjackPlayerHands[0]);
    if (playerValue === 21) {
        setTimeout(() => endBlackjackGame(), 500);
    }
}

function hitBlackjack() {
    if (!blackjackGameActive) return;

    blackjackPlayerHands[blackjackCurrentHandIndex].push(drawBlackjackCard());
    blackjackCanDouble = false;
    blackjackCanSplit = false;
    document.getElementById('blackjack-double-btn').style.display = 'none';
    document.getElementById('blackjack-split-btn').style.display = 'none';

    updateBlackjackDisplay();
    playSound('ding');

    const playerValue = calculateBlackjackHandValue(blackjackPlayerHands[blackjackCurrentHandIndex]);
    if (playerValue >= 21) {
        // Move to next hand or end game
        setTimeout(() => {
            if (blackjackCurrentHandIndex < blackjackPlayerHands.length - 1) {
                blackjackCurrentHandIndex++;
                blackjackCanDouble = blackjackPlayerHands[blackjackCurrentHandIndex].length === 2;
                document.getElementById('blackjack-double-btn').style.display = blackjackCanDouble ? 'inline-block' : 'none';
                updateBlackjackDisplay();
            } else {
                endBlackjackGame();
            }
        }, 500);
    }
}

function splitBlackjack() {
    if (!bjGameActive || bjPlayerHand.length !== 2) return;

    // Check if player has enough balance for split
    if (balance < bjBetAmount) {
        showToast('Not enough balance to split!', 'error');
        return;
    }

    // Check if cards can be split (same value)
    if (getBJCardValue(bjPlayerHand[0]) !== getBJCardValue(bjPlayerHand[1])) {
        showToast('Cards must have same value to split!', 'error');
        return;
    }

    // Deduct additional bet
    balance -= bjBetAmount;
    updateBalance();

    // Split the hands
    const card1 = bjPlayerHand[0];
    const card2 = bjPlayerHand[1];

    // Create two hands
    bjPlayerHand = [card1, bjDeck.pop()];
    bjSplitHand = [card2, bjDeck.pop()];

    playSound('blackjackCardFlip');
    setTimeout(() => playSound('blackjackCardFlip'), 150);

    document.getElementById('blackjack-split-btn').style.display = 'none';

    setTimeout(() => {
        updateBJDisplay(true);
        showToast('Split! Playing first hand...', 'info');

        const playerValue = getBJHandValue(bjPlayerHand);
        if (playerValue === 21) {
            setTimeout(() => {
                // Move to second hand
                playSecondSplitHand();
            }, 1000);
        }
    }, 300);
}

function playSecondSplitHand() {
    if (!bjSplitHand) return;

    bjPlayingSplitHand = true;
    bjPlayerHand = bjSplitHand;
    bjSplitHand = null;

    updateBJDisplay(true);
    showToast('Playing second hand...', 'info');

    const playerValue = getBJHandValue(bjPlayerHand);
    if (playerValue === 21) {
        setTimeout(() => standBlackjack(), 500);
    } else {
        // Show hit and stand buttons for second hand
        document.getElementById('blackjack-hit-btn').style.display = 'block';
        document.getElementById('blackjack-stand-btn').style.display = 'block';
    }
}

function standBlackjack() {
    if (!blackjackGameActive) return;

    // Move to next hand or end game
    if (blackjackCurrentHandIndex < blackjackPlayerHands.length - 1) {
        blackjackCurrentHandIndex++;
        blackjackCanDouble = blackjackPlayerHands[blackjackCurrentHandIndex].length === 2;
        blackjackCanSplit = false;
        document.getElementById('blackjack-double-btn').style.display = blackjackCanDouble ? 'inline-block' : 'none';
        document.getElementById('blackjack-split-btn').style.display = 'none';
        updateBlackjackDisplay();
    } else {
        endBlackjackGame();
    }
}

function updateBJDisplay(hideDealerCard) {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerTotalDiv = document.getElementById('player-total');
    const dealerTotalDiv = document.getElementById('dealer-total');
    
    // Player cards
    playerCardsDiv.innerHTML = bjPlayerHand.map(card => displayBJCard(card)).join('');
    playerTotalDiv.textContent = `Total: ${getBJHandValue(bjPlayerHand)}`;
    
    // Dealer cards
    if (hideDealerCard && bjDealerHand.length > 0) {
        dealerCardsDiv.innerHTML = displayBJCard(bjDealerHand[0]) + '<div class="bj-card">🂠</div>';
        dealerTotalDiv.textContent = `Showing: ${getBJCardValue(bjDealerHand[0])}`;
    } else {
        dealerCardsDiv.innerHTML = bjDealerHand.map(card => displayBJCard(card)).join('');
        dealerTotalDiv.textContent = `Total: ${getBJHandValue(bjDealerHand)}`;
    }
}

function endBlackjack(won, message) {
    bjGameActive = false;
    bjSplitHand = null;
    bjPlayingSplitHand = false;

    const resultDiv = document.getElementById('blackjack-result');
    const gameDisplay = document.querySelector('#blackjack-game .game-display');

    if (won === true) {
        const winAmount = bjBetAmount * 2;
        balance += winAmount;
        playWinSound(winAmount);
        resultDiv.textContent = message + ` Won $${(winAmount - bjBetAmount).toFixed(2)}`;
        resultDiv.style.color = '#00e701';
        resultDiv.style.textShadow = '0 0 20px #00e701, 0 0 40px #00e701';
        addWinEffect(gameDisplay);
        showToast(message + ` Won $${(winAmount - bjBetAmount).toFixed(2)}`, 'success');
        
        // Track blackjack wins
        achievementStats.blackjackWins++;
        checkAchievement('blackjackPro');
    } else if (won === null) {
        // Push - return bet
        balance += bjBetAmount;
        resultDiv.textContent = message;
        resultDiv.style.color = '#ffc800';
        showToast(message, 'info');
    } else {
        playSound('lose');
        resultDiv.textContent = message + ` Lost $${bjBetAmount.toFixed(2)}`;
        resultDiv.style.color = '#ff4757';
        resultDiv.style.textShadow = '0 0 20px #ff4757, 0 0 40px #ff4757';
        addLoseEffect(gameDisplay);
        showToast(message + ` Lost $${bjBetAmount.toFixed(2)}`, 'error');
    }

    updateBalance();

    setTimeout(() => {
        resultDiv.style.textShadow = 'none';
        resultDiv.textContent = 'Place your bet';
        resultDiv.style.color = '#b1bad3';
        document.getElementById('blackjack-deal-btn').style.display = 'block';
        document.getElementById('blackjack-hit-btn').style.display = 'none';
        document.getElementById('blackjack-split-btn').style.display = 'none';
        document.getElementById('blackjack-stand-btn').style.display = 'none';
        document.getElementById('player-cards').innerHTML = '';
        document.getElementById('dealer-cards').innerHTML = '';
        document.getElementById('player-total').textContent = '';
        document.getElementById('dealer-total').textContent = '';
    }, 3000);
}

// ===== TOWER GAME =====
let towerActive = false;
let towerBetAmount = 0;
let towerCurrentRow = 0;
let towerMultiplier = 1;
let towerSafeTiles = [];

function createTowerGrid() {
    const grid = document.getElementById('tower-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // 8 rows, 4 tiles each
    for (let row = 0; row < 8; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'tower-row';
        rowDiv.dataset.row = row;
        
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            tile.className = 'tower-tile disabled';
            tile.dataset.row = row;
            tile.dataset.col = col;
            tile.addEventListener('click', () => clickTowerTile(row, col));
            rowDiv.appendChild(tile);
        }
        
        grid.appendChild(rowDiv);
    }
}

function startTower() {
    const betAmount = parseFloat(document.getElementById('tower-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('tower', betAmount);
    updateBalance();
    
    towerActive = true;
    towerBetAmount = betAmount;
    towerCurrentRow = 0;
    towerMultiplier = 1;
    towerSafeTiles = [];
    
    const difficulty = document.getElementById('tower-difficulty').value;
    
    // Generate safe tiles for each row with better distribution
    for (let row = 0; row < 8; row++) {
        const safeTilesInRow = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1;
        
        // Create array of all columns and shuffle
        const allCols = [0, 1, 2, 3];
        for (let i = allCols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allCols[i], allCols[j]] = [allCols[j], allCols[i]];
        }
        
        // Take first N columns as safe tiles
        const rowSafeTiles = allCols.slice(0, safeTilesInRow);
        towerSafeTiles.push(rowSafeTiles);
    }
    
    // Enable first row
    document.querySelectorAll('.tower-tile').forEach(tile => {
        tile.classList.add('disabled');
        tile.classList.remove('revealed', 'safe', 'danger');
        tile.textContent = '';
        
        if (parseInt(tile.dataset.row) === 0) {
            tile.classList.remove('disabled');
        }
    });
    
    document.getElementById('tower-start-btn').style.display = 'none';
    document.getElementById('tower-cashout-btn').style.display = 'block';
    document.getElementById('tower-bet').disabled = true;
    document.getElementById('tower-difficulty').disabled = true;
    document.getElementById('tower-profit').textContent = '$0.00';
}

function clickTowerTile(row, col) {
    if (!towerActive) return;

    const actualRow = Number(row);
    const actualCol = Number(col);

    if (actualRow !== towerCurrentRow) return;

    const tile = document.querySelector(`.tower-tile[data-row="${actualRow}"][data-col="${actualCol}"]`);
    if (!tile) return;

    if (tile.classList.contains('revealed') || tile.classList.contains('disabled')) return;

    const isSafe = towerSafeTiles[actualRow] && towerSafeTiles[actualRow].includes(actualCol);

    tile.classList.add('revealed', 'scale-pop');

    if (isSafe) {
        tile.classList.add('safe');
        tile.textContent = '✓';
        playSound('towerWin');

        // Update multiplier
        const difficulty = document.getElementById('tower-difficulty').value;
        const multiplierIncrease = difficulty === 'easy' ? 1.3 : difficulty === 'medium' ? 1.5 : 2.0;
        towerMultiplier *= multiplierIncrease;

        const profit = (towerBetAmount * towerMultiplier) - towerBetAmount;
        document.getElementById('tower-profit').textContent = `$${profit.toFixed(2)}`;

        // Disable current row
        document.querySelectorAll(`.tower-tile[data-row="${actualRow}"]`).forEach(t => {
            t.classList.add('disabled');
        });

        // Move to next row
        towerCurrentRow++;

        if (towerCurrentRow >= 8) {
            // Won the tower!
            setTimeout(() => {
                endTower(true);
                createConfetti();
            }, 500);
        } else {
            // Enable next row with animation
            document.querySelectorAll(`.tower-tile[data-row="${towerCurrentRow}"]`).forEach(t => {
                t.classList.remove('disabled');
                t.classList.add('bounce');
                setTimeout(() => t.classList.remove('bounce'), 500);
            });
        }
    } else {
        // Check if tower shield is active
        if (window.towerShieldActive) {
            window.towerShieldActive = false;
            tile.classList.add('safe');
            tile.textContent = '🛡️';
            playSound('towerWin');
            showToast('🛡️ Tower Shield saved you!', 'success');
            
            // Don't end the game, just mark this tile as safe
            setTimeout(() => {
                tile.classList.remove('revealed');
                tile.classList.add('disabled');
            }, 1000);
            return;
        }
        
        tile.classList.add('danger', 'lose-shake');
        tile.textContent = '✗';
        playSound('mineLose');

        // Reveal all safe tiles in current row
        if (towerSafeTiles[actualRow]) {
            towerSafeTiles[actualRow].forEach(safeCol => {
                const safeTile = document.querySelector(`.tower-tile[data-row="${actualRow}"][data-col="${safeCol}"]`);
                if (safeTile && !safeTile.classList.contains('revealed')) {
                    setTimeout(() => {
                        safeTile.classList.add('revealed', 'safe', 'fade-in');
                        safeTile.textContent = '✓';
                    }, 200);
                }
            });
        }

        setTimeout(() => endTower(false), 1000);
    }
}

function cashoutTower() {
    if (!towerActive || towerCurrentRow === 0) return;
    endTower(true);
}

function endTower(won) {
    towerActive = false;
    const gameDisplay = document.querySelector('#tower-game .game-display');
    
    if (won && towerCurrentRow > 0) {
        const winAmount = towerBetAmount * towerMultiplier;
        balance += winAmount;
        trackResult('tower', towerBetAmount, winAmount);
        playWinSound(winAmount);
        addWinEffect(gameDisplay);
        
        if (towerCurrentRow >= 8) {
            showToast(`Completed Tower! Won $${(winAmount - towerBetAmount).toFixed(2)} (${towerMultiplier.toFixed(2)}x)`, 'success');
        } else {
            showToast(`Cashed out! Won $${(winAmount - towerBetAmount).toFixed(2)} (${towerMultiplier.toFixed(2)}x)`, 'success');
        }
    } else if (!won) {
        trackResult('tower', towerBetAmount, 0);
        playSound('lose');
        addLoseEffect(gameDisplay);
        showToast(`Hit danger tile! Lost $${towerBetAmount.toFixed(2)}`, 'error');
    }
    
    updateBalance();
    
    setTimeout(() => {
        document.getElementById('tower-start-btn').style.display = 'block';
        document.getElementById('tower-cashout-btn').style.display = 'none';
        document.getElementById('tower-bet').disabled = false;
        document.getElementById('tower-difficulty').disabled = false;
        document.getElementById('tower-profit').textContent = '$0.00';
        createTowerGrid();
    }, 2000);
}


function buyUpgrade(upgradeType) {
    const price = upgradePrices[upgradeType];

    if (balance < price) {
        showToast('Not enough balance!', 'error');
        return;
    }

    balance -= price;
    updateBalance();
    playSound('shopBuy');
    upgrades[upgradeType]++;
    
    // Track upgrade purchases
    achievementStats.upgradesPurchased++;
    checkAchievement('upgradeKing');

    const upgradeNames = {
        minesReveal: 'Mine Detector',
        minesShield: 'Mine Shield',
        stocksInsider: 'Insider Trading',
        plinkoLuck: 'Lucky Plinko',
        plinkoMagnet: 'Plinko Magnet',
        diceBoost: 'Loaded Dice',
        dicePerfect: 'Perfect Roll',
        stocksForceUp: 'Bull Market',
        crashSafety: 'Crash Insurance',
        crashMoon: 'Moon Shot',
        limboBoost: 'Limbo Boost',
        limboPrecision: 'Limbo Precision',
        rouletteVision: 'Roulette Vision',
        rouletteMagnet: 'Wheel Magnet',
        slotsLuck: 'Lucky Slots',
        slotsDiamond: 'Diamond Reels',
        blackjackPeek: 'Card Peek',
        blackjackCounter: 'Card Counter',
        towerShield: 'Tower Shield',
        towerVision: 'Tower Vision',
        kenoOracle: 'Keno Oracle',
        kenoMaster: 'Keno Master',
        coinBias: 'Biased Coin',
        coinLucky: 'Lucky Coin',
        casesLuck: 'Lucky Case',
        casesRare: 'Rare Finder',
        scratchGolden: 'Golden Ticket',
        scratchReveal: 'X-Ray Vision',
        packsBoost: 'Pack Boost',
        packsLegendary: 'Legendary Hunter',
        pumpSafety: 'Pump Safety',
        pumpGreed: 'Greedy Pump',
        drillLuck: 'Lucky Drill',
        drillVision: 'Drill Vision',
        diamondsMatch: 'Match Master',
        diamondsRare: 'Rare Gems',
        dartsAim: 'Perfect Aim',
        dartsBullseye: 'Bullseye Master',
        chickenSafety: 'Chicken Shield',
        chickenGreed: 'Greedy Chicken',
        hiloOracle: 'Card Oracle',
        hiloStreak: 'Streak Master',
        tarotFortune: 'Fortune Teller',
        tarotVision: 'Mystic Vision',
        snakesLadder: 'Ladder Boost',
        snakesLuck: 'Lucky Roll',
        baccaratVision: 'Card Vision',
        baccaratLuck: 'Lucky Baccarat',
        videopokerLuck: 'Lucky Video Poker',
        videopokerVision: 'Poker Vision',
        rpsLuck: 'Lucky RPS',
        rpsPsychic: 'Psychic Reading'
    };

    // Update display
    const displayElement = document.getElementById(`upgrade-${upgradeType}`);
    console.log(`Looking for element: upgrade-${upgradeType}`, displayElement);
    if (displayElement) {
        displayElement.textContent = upgrades[upgradeType];
        console.log(`Updated ${upgradeType} to ${upgrades[upgradeType]}`);
    } else {
        console.error(`Display element not found for upgrade-${upgradeType}`);
    }
    
    // Show upgrade buttons when purchased
    const buttonMap = {
        diceBoost: 'loaded-dice-btn',
        plinkoLuck: 'lucky-plinko-btn',
        plinkoMagnet: 'plinko-magnet-btn',
        minesReveal: 'mine-detector-btn',
        minesShield: 'mine-shield-btn',
        limboBoost: 'limbo-boost-btn',
        limboPrecision: 'limbo-precision-btn',
        crashSafety: 'crash-insurance-btn',
        crashMoon: 'moon-shot-btn',
        rouletteVision: 'roulette-vision-btn',
        rouletteMagnet: 'wheel-magnet-btn',
        coinBias: 'biased-coin-btn',
        coinLucky: 'lucky-coin-btn',
        kenoOracle: 'keno-oracle-btn',
        kenoMaster: 'keno-master-btn',
        stocksInsider: 'insider-trading-btn',
        stocksForceUp: 'bull-market-btn',
        slotsLuck: 'lucky-slots-btn',
        slotsDiamond: 'diamond-reels-btn',
        towerShield: 'tower-shield-btn',
        towerVision: 'tower-vision-btn',
        casesLuck: 'cases-luck-btn',
        casesRare: 'cases-rare-btn',
        scratchGolden: 'scratch-golden-btn',
        scratchReveal: 'scratch-reveal-btn',
        packsBoost: 'packs-boost-btn',
        packsLegendary: 'packs-legendary-btn',
        pumpSafety: 'pump-safety-btn',
        pumpGreed: 'pump-greed-btn',
        drillLuck: 'drill-luck-btn',
        drillVision: 'drill-vision-btn',
        diamondsMatch: 'diamonds-match-btn',
        diamondsRare: 'diamonds-rare-btn',
        dartsAim: 'darts-aim-btn',
        dartsBullseye: 'darts-bullseye-btn',
        chickenSafety: 'chicken-safety-btn',
        chickenGreed: 'chicken-greed-btn',
        hiloOracle: 'hilo-oracle-btn',
        hiloStreak: 'hilo-streak-btn',
        tarotFortune: 'tarot-fortune-btn',
        tarotVision: 'tarot-vision-btn',
        snakesLadder: 'snakes-ladder-btn',
        snakesLuck: 'snakes-luck-btn'
    };
    
    const buttonId = buttonMap[upgradeType];
    console.log(`Button ID for ${upgradeType}: ${buttonId}`);
    if (buttonId) {
        const button = document.getElementById(buttonId);
        console.log(`Button element:`, button);
        if (button) {
            button.style.display = 'block';
            console.log(`Showed button: ${buttonId}`);
        } else {
            console.error(`Button not found: ${buttonId}`);
        }
    } else {
        console.log(`No button mapping for ${upgradeType}`);
    }

    showToast(`Purchased ${upgradeNames[upgradeType]}! (${upgrades[upgradeType]} available)`, 'success');
}


// ===== GAME SELECTION =====
function showGameSelection() {
    console.log('showGameSelection called!');
    const overlay = document.getElementById('game-selection-overlay');
    console.log('Overlay element:', overlay);
    if (overlay) {
        overlay.classList.add('active');
        console.log('Active class added, overlay should be visible');
        console.log('Overlay display:', window.getComputedStyle(overlay).display);
    } else {
        console.error('ERROR: game-selection-overlay not found!');
    }
}

// Make sure function is globally available
window.showGameSelection = showGameSelection;

function closeGameSelection() {
    document.getElementById('game-selection-overlay').classList.remove('active');
}

function selectGameFromGrid(game) {
    closeGameSelection();
    showGame(game);
}

// ===== CASE OPENING GAME =====
const caseIcons = {
    bronze: '📦',
    silver: '🎁',
    gold: '💼',
    diamond: '💎',
    platinum: '🏆',
    legendary: '👑',
    mythic: '⭐'
};

const caseRewards = {
    bronze: [
        { name: 'Small Win', value: 5, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 12, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 25, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 50, rarity: 'legendary', icon: '👑' }
    ],
    silver: [
        { name: 'Small Win', value: 35, rarity: 'common', icon: '�' },
        { name: 'Medium Win', value: 60, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 125, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 250, rarity: 'legendary', icon: '�' }
    ],
    gold: [
        { name: 'Small Win', value: 70, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 125, rarity: 'rare', icon: '�' },
        { name: 'Big Win', value: 250, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 500, rarity: 'legendary', icon: '👑' }
    ],
    diamond: [
        { name: 'Small Win', value: 60, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 125, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 250, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 500, rarity: 'legendary', icon: '👑' }
    ],
    platinum: [
        { name: 'Small Win', value: 150, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 300, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 600, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 1250, rarity: 'legendary', icon: '👑' }
    ],
    legendary: [
        { name: 'Small Win', value: 300, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 600, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 1250, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 2500, rarity: 'legendary', icon: '👑' }
    ],
    mythic: [
        { name: 'Small Win', value: 600, rarity: 'common', icon: '💰' },
        { name: 'Medium Win', value: 1250, rarity: 'rare', icon: '💎' },
        { name: 'Big Win', value: 2500, rarity: 'epic', icon: '🏆' },
        { name: 'Jackpot', value: 5000, rarity: 'legendary', icon: '👑' }
    ]
};

const casePrices = {
    bronze: 10,
    silver: 25,
    gold: 50,
    diamond: 100,
    platinum: 250,
    legendary: 500,
    mythic: 1000
};

function updateCaseIcon() {
    const caseType = document.getElementById('case-type').value;
    const caseBox = document.getElementById('case-box');
    caseBox.textContent = caseIcons[caseType];
}

let caseOpeningCooldown = false;

function openCase() {
    if (caseOpeningCooldown) {
        showToast('Wait for cases to finish opening', 'error');
        return;
    }

    const caseType = document.getElementById('case-type').value;
    const quantity = parseInt(document.getElementById('case-quantity').value) || 1;
    const price = casePrices[caseType];
    const totalCost = price * quantity;

    if (balance < totalCost) {
        showToast(`Not enough balance! Need $${totalCost.toFixed(2)}`, 'error');
        return;
    }

    balance -= totalCost;
    trackBet('cases', totalCost);
    updateBalance();

    // Always use spin mode
    openMultipleCasesSpin(caseType, price, quantity);
}

function openMultipleCasesFast(caseType, price, quantity) {
    let totalProfit = 0;
    const itemsDiv = document.getElementById('case-items');
    itemsDiv.innerHTML = '';
    const resultDiv = document.getElementById('case-result');
    resultDiv.textContent = 'Opening...';

    // Open all cases at once
    for (let i = 0; i < quantity; i++) {
        const reward = getRandomReward(caseType);
        balance += reward.value;
        
        const profit = reward.value - price;
        totalProfit += profit;

        // Create item card
        const itemCard = document.createElement('div');
        itemCard.className = `case-item ${reward.rarity}`;
        itemCard.innerHTML = `
            <div class="case-item-icon">${reward.icon}</div>
            <div class="case-item-name">${reward.name}</div>
            <div class="case-item-value">${reward.value}</div>
        `;
        itemsDiv.appendChild(itemCard);
    }

    updateBalance();

    // Play sound based on best reward
    const legendaryCount = itemsDiv.querySelectorAll('.legendary').length;
    if (legendaryCount > 0) {
        playSound('jackpot');
        createConfetti();
    } else if (totalProfit > 0) {
        playWinSound(totalProfit);
    } else {
        playSound('lose');
    }

    // Show total result
    const profitText = totalProfit >= 0 ? `+${totalProfit.toFixed(2)}` : `-${Math.abs(totalProfit).toFixed(2)}`;
    const profitColor = totalProfit >= 0 ? '#00e701' : '#ff4757';
    resultDiv.innerHTML = `<span style="color: ${profitColor}; font-size: 24px;">Opened ${quantity} cases: ${profitText}</span>`;
    
    showToast(`Opened ${quantity} cases: ${profitText}`, totalProfit >= 0 ? 'success' : 'error');

    setTimeout(() => {
        caseOpeningCooldown = false;
    }, 300);
}

function openMultipleCasesSpin(caseType, price, quantity) {
    // For spin mode, open one at a time
    openCaseSpin(caseType, price, () => {
        setTimeout(() => {
            caseOpeningCooldown = false;
        }, 300);
    });
}

function openCaseFast(caseType, price, callback) {
    const caseBox = document.getElementById('case-box');
    const resultDiv = document.getElementById('case-result');
    const itemsDiv = document.getElementById('case-items');
    const spinContainer = document.getElementById('case-spin-container');

    // Hide spin mode, show fast mode
    spinContainer.style.display = 'none';
    caseBox.style.display = 'block';
    caseBox.style.opacity = '1';

    // Set case icon
    caseBox.textContent = caseIcons[caseType];
    
    // Reset
    caseBox.classList.remove('opening');
    resultDiv.textContent = 'Opening...';
    itemsDiv.innerHTML = '';

    // Animate case opening
    setTimeout(() => {
        caseBox.classList.add('opening');
        playSound('caseUnbox');
    }, 100);

    setTimeout(() => {
        const reward = getRandomReward(caseType);

        // Show reward
        balance += reward.value;
        updateBalance();

        const profit = reward.value - price;
        const profitText = profit > 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
        const profitColor = profit > 0 ? '#00e701' : '#ff4757';

        resultDiv.innerHTML = `<span style="color: ${profitColor}; font-size: 32px;">${reward.icon} ${reward.name}</span><br><span style="color: ${profitColor};">Won $${reward.value} (${profitText})</span>`;

        // Create item card
        const itemCard = document.createElement('div');
        itemCard.className = `case-item ${reward.rarity}`;
        itemCard.innerHTML = `
            <div class="case-item-icon">${reward.icon}</div>
            <div class="case-item-name">${reward.name}</div>
            <div class="case-item-value">$${reward.value}</div>
        `;
        itemsDiv.appendChild(itemCard);

        if (reward.rarity === 'legendary') {
            playSound('jackpot');
            createConfetti();
        } else if (profit > 0) {
            playWinSound(reward.value);
        } else {
            playSound('lose');
        }

        showToast(`${reward.icon} ${reward.name}: $${reward.value} (${profitText})`, profit > 0 ? 'success' : 'error');

        // Reset case box
        setTimeout(() => {
            caseBox.classList.remove('opening');
            caseBox.style.opacity = '1';
            caseBox.textContent = caseIcons[caseType];
            
            // Call callback if provided
            if (callback) {
                callback(reward, profit);
            }
        }, 1500);
    }, 1200);
}

function openCaseSpin(caseType, price, callback) {
    const caseBox = document.getElementById('case-box');
    const spinContainer = document.getElementById('case-spin-container');
    const spinItems = document.getElementById('case-spin-items');
    const resultDiv = document.getElementById('case-result');
    const itemsDiv = document.getElementById('case-items');

    // Show spin mode below case icon
    caseBox.style.opacity = '1';
    spinContainer.style.display = 'block';

    // Reset
    resultDiv.textContent = 'Spinning...';
    itemsDiv.innerHTML = '';
    spinItems.innerHTML = '';
    spinItems.style.transition = 'none';
    spinItems.style.left = '0px';

    // Generate items for spin (50 items)
    const allItems = [];
    const rewards = caseRewards[caseType];
    
    for (let i = 0; i < 50; i++) {
        const rand = Math.random();
        let reward;
        if (rand < 0.01) reward = rewards[3]; // legendary
        else if (rand < 0.10) reward = rewards[2]; // epic
        else if (rand < 0.35) reward = rewards[1]; // rare
        else reward = rewards[0]; // common
        
        allItems.push(reward);
    }

    // Set the winning item at position 25 (middle)
    const winningReward = getRandomReward(caseType);
    allItems[25] = winningReward;

    // Display items
    allItems.forEach(reward => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `case-spin-item ${reward.rarity}`;
        itemDiv.innerHTML = `
            <div class="case-spin-item-icon">${reward.icon}</div>
            <div class="case-spin-item-name">${reward.name}</div>
        `;
        spinItems.appendChild(itemDiv);
    });

    playSound('caseUnbox');

    // Calculate target position (center the winning item)
    const containerWidth = spinContainer.offsetWidth;
    const itemWidth = 120;
    const targetPosition = -(25 * itemWidth) + (containerWidth / 2) - (itemWidth / 2);

    setTimeout(() => {
        spinItems.style.transition = 'left 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        spinItems.style.left = targetPosition + 'px';
    }, 100);

    setTimeout(() => {
        // Show reward
        balance += winningReward.value;
        trackResult('cases', price, winningReward.value);
        updateBalance();

        const profit = winningReward.value - price;
        const profitText = profit > 0 ? `+$${profit.toFixed(2)}` : `-$${Math.abs(profit).toFixed(2)}`;
        const profitColor = profit > 0 ? '#00e701' : '#ff4757';

        resultDiv.innerHTML = `<span style="color: ${profitColor}; font-size: 32px;">${winningReward.icon} ${winningReward.name}</span><br><span style="color: ${profitColor};">Won $${winningReward.value} (${profitText})</span>`;

        // Create item card
        const itemCard = document.createElement('div');
        itemCard.className = `case-item ${winningReward.rarity}`;
        itemCard.innerHTML = `
            <div class="case-item-icon">${winningReward.icon}</div>
            <div class="case-item-name">${winningReward.name}</div>
            <div class="case-item-value">$${winningReward.value}</div>
        `;
        itemsDiv.appendChild(itemCard);

        if (winningReward.rarity === 'legendary') {
            playSound('jackpot');
            createConfetti();
        } else if (profit > 0) {
            playWinSound(winningReward.value);
        } else {
            playSound('lose');
        }

        showToast(`${winningReward.icon} ${winningReward.name}: $${winningReward.value} (${profitText})`, profit > 0 ? 'success' : 'error');
        
        // Call callback if provided
        if (callback) {
            callback(winningReward, profit);
        }
    }, 5200);
}

function getRandomReward(caseType) {
    const rewards = caseRewards[caseType];
    const rand = Math.random();
    
    if (rand < 0.01) return rewards[3]; // 1% legendary
    else if (rand < 0.10) return rewards[2]; // 9% epic
    else if (rand < 0.35) return rewards[1]; // 25% rare
    else return rewards[0]; // 65% common
}



// ===== SCRATCH CARD GAME =====
let scratchActive = false;
let scratchCanvas = null;
let scratchCtx = null;
let isScratching = false;
let scratchedPercentage = 0;
let scratchSymbols = [];
let scratchPrice = 0;

function buyScratchCard() {
    const price = parseFloat(document.getElementById('scratch-price').value);
    const cardType = document.getElementById('scratch-type').value;

    if (balance < price) {
        showToast('Not enough balance!', 'error');
        return;
    }

    if (scratchActive) {
        showToast('Scratch current card first!', 'error');
        return;
    }

    balance -= price;
    trackBet('scratch', price);
    updateBalance();
    scratchActive = true;
    scratchPrice = price;
    scratchedPercentage = 0;

    const overlay = document.getElementById('scratch-overlay');
    const symbolsDiv = document.getElementById('scratch-symbols');
    const resultDiv = document.getElementById('scratch-result');
    const subtitle = document.getElementById('scratch-subtitle');

    // Reset
    overlay.style.display = 'flex';
    resultDiv.textContent = '';
    symbolsDiv.innerHTML = '';
    symbolsDiv.className = 'scratch-symbols';

    // Generate symbols based on card type
    const symbols = ['💎', '🏆', '👑', '⭐', '💰', '🎁', '🔔', '7️⃣'];
    scratchSymbols = [];

    let numSymbols = 9;
    let matchRequired = 3;
    let winChance = 0.15; // Much harder

    if (cardType === 'lucky') {
        numSymbols = 9;
        matchRequired = 1;
        winChance = 0.08; // Very rare instant win
        subtitle.textContent = 'Match 1 to Win! (Very Rare)';
    } else if (cardType === 'mega') {
        numSymbols = 15;
        matchRequired = 5;
        winChance = 0.12; // Harder mega
        subtitle.textContent = 'Match 5 to Win Big!';
        symbolsDiv.classList.add('mega');
    } else {
        subtitle.textContent = 'Match 3 to Win!';
    }

    // Determine if win
    const isWin = Math.random() < winChance;

    if (isWin) {
        const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        for (let i = 0; i < matchRequired; i++) {
            scratchSymbols.push(winSymbol);
        }
        // Add random symbols for remaining spots
        for (let i = 0; i < numSymbols - matchRequired; i++) {
            scratchSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    } else {
        // All random, no matches
        for (let i = 0; i < numSymbols; i++) {
            scratchSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
    }

    // Shuffle
    scratchSymbols.sort(() => Math.random() - 0.5);

    // Display symbols
    scratchSymbols.forEach((symbol, index) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'scratch-symbol';
        symbolDiv.textContent = symbol;
        symbolsDiv.appendChild(symbolDiv);
    });

    // Create canvas for scratching
    if (!scratchCanvas) {
        scratchCanvas = document.createElement('canvas');
        scratchCanvas.className = 'scratch-canvas';
        overlay.appendChild(scratchCanvas);
        scratchCtx = scratchCanvas.getContext('2d');
    }

    // Set canvas size
    const rect = overlay.getBoundingClientRect();
    scratchCanvas.width = rect.width;
    scratchCanvas.height = rect.height;

    // Draw colorful scratch-off layer based on price
    let gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    if (price >= 500) {
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.5, '#ff6b35');
        gradient.addColorStop(1, '#8b00ff');
    } else if (price >= 100) {
        gradient.addColorStop(0, '#00e701');
        gradient.addColorStop(1, '#00a8cc');
    } else if (price >= 50) {
        gradient.addColorStop(0, '#ff6b35');
        gradient.addColorStop(1, '#ffc800');
    } else {
        gradient.addColorStop(0, '#c0c0c0');
        gradient.addColorStop(1, '#808080');
    }

    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

    // Update card appearance based on price
    const scratchCard = document.getElementById('scratch-card');
    const cardHeader = scratchCard.querySelector('.scratch-card-header');
    
    if (price >= 500) {
        scratchCard.style.background = 'linear-gradient(135deg, #ffd700, #ff6b35, #8b00ff)';
        scratchCard.style.borderColor = '#8b00ff';
        cardHeader.style.background = 'linear-gradient(135deg, #8b00ff, #ff6b35)';
    } else if (price >= 100) {
        scratchCard.style.background = 'linear-gradient(135deg, #00e701, #00a8cc)';
        scratchCard.style.borderColor = '#00e701';
        cardHeader.style.background = 'linear-gradient(135deg, #00e701, #00a8cc)';
    } else if (price >= 50) {
        scratchCard.style.background = 'linear-gradient(135deg, #ff6b35, #ffc800)';
        scratchCard.style.borderColor = '#ff6b35';
        cardHeader.style.background = 'linear-gradient(135deg, #ff6b35, #ffc800)';
    } else {
        scratchCard.style.background = 'linear-gradient(135deg, #c0c0c0, #808080)';
        scratchCard.style.borderColor = '#808080';
        cardHeader.style.background = 'linear-gradient(135deg, #808080, #606060)';
    }

    // Add sparkle texture
    scratchCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 150; i++) {
        scratchCtx.fillRect(
            Math.random() * scratchCanvas.width,
            Math.random() * scratchCanvas.height,
            3, 3
        );
    }

    // Scratch functionality
    let scratchSoundPlaying = false;

    const scratch = (e) => {
        if (!isScratching) return;

        const rect = scratchCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        scratchCtx.globalCompositeOperation = 'destination-out';
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, 35, 0, Math.PI * 2);
        scratchCtx.fill();

        // Check scratched percentage
        checkScratchProgress();
    };

    const startScratching = (e) => {
        isScratching = true;
        
        // Start scratch sound only if not already playing
        if (!window.currentScratchSound) {
            const scratchSound = sounds.scratchTicket.cloneNode();
            scratchSound.loop = true;
            scratchSound.volume = 0.3;
            scratchSound.play();
            window.currentScratchSound = scratchSound;
        }
        
        scratch(e);
    };

    const stopScratching = () => {
        isScratching = false;
        
        // Stop the scratch sound immediately
        if (window.currentScratchSound) {
            window.currentScratchSound.pause();
            window.currentScratchSound.currentTime = 0;
            window.currentScratchSound = null;
        }
    };

    scratchCanvas.addEventListener('mousedown', startScratching);
    scratchCanvas.addEventListener('mousemove', scratch);
    scratchCanvas.addEventListener('mouseup', stopScratching);
    scratchCanvas.addEventListener('mouseleave', stopScratching);

    scratchCanvas.addEventListener('touchstart', startScratching);
    scratchCanvas.addEventListener('touchmove', scratch);
    scratchCanvas.addEventListener('touchend', stopScratching);
}

function checkScratchProgress() {
    if (!scratchCanvas || !scratchCtx) return;

    const imageData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) {
            transparentPixels++;
        }
    }

    scratchedPercentage = (transparentPixels / (pixels.length / 4)) * 100;

    if (scratchedPercentage > 60 && scratchActive) {
        revealScratchCard();
    }
}

function revealScratchCard() {
    scratchActive = false;
    const overlay = document.getElementById('scratch-overlay');
    const resultDiv = document.getElementById('scratch-result');
    const cardType = document.getElementById('scratch-type').value;

    // Hide overlay with fade
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.style.opacity = '1';
    }, 300);

    // Reveal symbols with animation
    const symbols = document.querySelectorAll('.scratch-symbol');
    symbols.forEach((symbol, index) => {
        setTimeout(() => {
            symbol.classList.add('revealed');
        }, index * 50);
    });

    // Check for win based on card type
    const symbolCounts = {};
    scratchSymbols.forEach(s => {
        symbolCounts[s] = (symbolCounts[s] || 0) + 1;
    });

    let winMultiplier = 0;
    let matchRequired = cardType === 'lucky' ? 1 : cardType === 'mega' ? 5 : 3;
    
    for (const symbol in symbolCounts) {
        if (symbolCounts[symbol] >= matchRequired) {
            if (cardType === 'lucky') {
                winMultiplier = 10; // Lucky cards pay 10x
            } else if (cardType === 'mega') {
                winMultiplier = symbolCounts[symbol] * 2; // Mega pays double
            } else {
                winMultiplier = symbolCounts[symbol];
            }
            break;
        }
    }

    setTimeout(() => {
        if (winMultiplier > 0) {
            const winAmount = scratchPrice * winMultiplier;
            balance += winAmount;
            trackResult('scratch', scratchPrice, winAmount);
            updateBalance();
            playWinSound(winAmount);
            playSound('jackpot');
            resultDiv.textContent = `🎉 Won ${winAmount.toFixed(2)}! (${winMultiplier}x)`;
            resultDiv.style.color = '#00e701';
            showToast(`🎉 Won ${winAmount.toFixed(2)}! (${winMultiplier}x)`, 'success');

            if (winMultiplier >= 5 || winAmount >= 500) {
                createConfetti();
            }
        } else {
            trackResult('scratch', scratchPrice, 0);
            playSound('lose');
            resultDiv.textContent = `No match - Lost ${scratchPrice.toFixed(2)}`;
            resultDiv.style.color = '#ff4757';
            showToast(`No match - Lost ${scratchPrice.toFixed(2)}`, 'error');
        }
    }, symbols.length * 50 + 200);
}


// ===== PACKS GAME =====
let packsCooldown = false;

function updatePackPreview() {
    const packType = document.getElementById('pack-type').value;
    const packBox = document.getElementById('pack-box');
    packBox.className = 'pack-box pack-' + packType;
}

function togglePackCollection() {
    const modal = document.getElementById('pack-collection-modal');
    modal.classList.toggle('active');
}

function createPackSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
        setTimeout(function() {
            const sparkle = document.createElement('div');
            sparkle.className = 'pack-sparkle';
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + rect.width / 2) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2) + 'px';
            sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
            sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
            document.body.appendChild(sparkle);
            
            setTimeout(function() { sparkle.remove(); }, 1000);
        }, i * 50);
    }
}

function openPack() {
    if (packsCooldown) {
        showToast('Please wait for current pack to finish opening...', 'error');
        return;
    }

    const packType = document.getElementById('pack-type').value;
    const quantity = parseInt(document.getElementById('pack-quantity').value);

    const packPrices = { starter: 20, premium: 50, elite: 100, legendary: 250, mythic: 500, cosmic: 1000 };
    const totalCost = packPrices[packType] * quantity;

    if (balance < totalCost) {
        showToast('Not enough balance!', 'error');
        return;
    }

    packsCooldown = true;

    balance -= totalCost;
    trackBet('packs', totalCost);
    updateBalance();

    const packBox = document.getElementById('pack-box');
    const packCards = document.getElementById('pack-cards');
    const packResult = document.getElementById('pack-result');

    packCards.innerHTML = '';
    packResult.textContent = '';

    packBox.className = 'pack-box pack-' + packType;
    createPackSparkles(packBox);
    packBox.classList.add('opening');
    playSound('caseUnbox');

    setTimeout(function() {
        packBox.classList.remove('opening');

        const cardPool = {
            starter: { common: 0.7, rare: 0.25, epic: 0.04, legendary: 0.01 },
            premium: { common: 0.5, rare: 0.35, epic: 0.12, legendary: 0.03 },
            elite: { common: 0.3, rare: 0.45, epic: 0.20, legendary: 0.05 },
            legendary: { common: 0.1, rare: 0.40, epic: 0.35, legendary: 0.15 },
            mythic: { rare: 0.3, epic: 0.45, legendary: 0.20, mythic: 0.05 },
            cosmic: { epic: 0.35, legendary: 0.40, mythic: 0.20, cosmic: 0.05 }
        };

        const rarityValues = {
            common: [1, 2, 3],
            rare: [5, 8, 12],
            epic: [15, 25, 35],
            legendary: [50, 80, 120],
            mythic: [200, 300, 400],
            cosmic: [1000, 1500, 2000]
        };

        if (packType === 'mythic') {
            rarityValues.rare = [10, 15, 20];
            rarityValues.epic = [30, 45, 60];
            rarityValues.legendary = [100, 150, 200];
        } else if (packType === 'cosmic') {
            rarityValues.epic = [50, 80, 100];
            rarityValues.legendary = [200, 300, 400];
            rarityValues.mythic = [500, 700, 900];
        }

        let totalWinnings = 0;
        const cardsPerPack = 5;

        for (let p = 0; p < quantity; p++) {
            for (let i = 0; i < cardsPerPack; i++) {
                const rand = Math.random();
                let rarity = 'common';
                let cumulative = 0;

                for (const r in cardPool[packType]) {
                    cumulative += cardPool[packType][r];
                    if (rand <= cumulative) {
                        rarity = r;
                        break;
                    }
                }

                const value = rarityValues[rarity][Math.floor(Math.random() * rarityValues[rarity].length)];
                totalWinnings += value;

                const rarityIcons = { common: '🎴', rare: '⭐', epic: '💎', legendary: '👑', mythic: '⭐', cosmic: '🌟' };

                const cardDiv = document.createElement('div');
                cardDiv.className = 'pack-card ' + rarity;
                cardDiv.innerHTML = '<div class="pack-card-icon">' + rarityIcons[rarity] + '</div><div class="pack-card-name">' + rarity.toUpperCase() + '</div><div class="pack-card-value">$' + value.toFixed(2) + '</div>';

                setTimeout(function() {
                    packCards.appendChild(cardDiv);
                    playSound('ding');
                    if (rarity === 'legendary' || rarity === 'mythic' || rarity === 'cosmic') {
                        createConfetti();
                    }
                }, (p * cardsPerPack + i) * 100);
            }
        }

        setTimeout(function() {
            balance += totalWinnings;
            trackResult('packs', totalCost, totalWinnings);
            updateBalance();

            const profit = totalWinnings - totalCost;
            if (profit > 0) {
                playWinSound(profit);
                packResult.textContent = 'Total: $' + totalWinnings.toFixed(2) + ' (Profit: +$' + profit.toFixed(2) + ')';
                packResult.style.color = '#00e701';
                showToast('Profit: +$' + profit.toFixed(2), 'success');
                if (profit >= 100) createConfetti();
            } else {
                playSound('lose');
                packResult.textContent = 'Total: $' + totalWinnings.toFixed(2) + ' (Loss: -$' + Math.abs(profit).toFixed(2) + ')';
                packResult.style.color = '#ff4757';
                showToast('Loss: -$' + Math.abs(profit).toFixed(2), 'error');
            }

            packsCooldown = false;
        }, quantity * cardsPerPack * 100 + 200);
    }, 1000);
}

// ===== PUMP GAME =====
let pumpActive = false;
let pumpBetAmount = 0;
let pumpMultiplier = 1.00;
let pumpCooldown = false;
let pumpCount = 0;
let pumpPopChance = 0.05;

function startPump() {
    const betAmount = parseFloat(document.getElementById('pump-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('pump', betAmount);
    updateBalance();
    
    pumpActive = true;
    pumpBetAmount = betAmount;
    pumpMultiplier = 1.00;
    pumpCount = 0;
    pumpPopChance = 0.05;
    
    document.getElementById('pump-start-btn').style.display = 'none';
    document.getElementById('pump-pump-btn').style.display = 'block';
    document.getElementById('pump-cashout-btn').style.display = 'block';
    document.getElementById('pump-result').textContent = '';
    
    updatePumpDisplay();
}

function pumpBalloon() {
    if (!pumpActive || pumpCooldown) return;

    pumpCooldown = true;
    setTimeout(() => { pumpCooldown = false; }, 150); // 150ms tiny cooldown

    if (Math.random() < pumpPopChance) {
        pumpActive = false;
        trackResult('pump', pumpBetAmount, 0);

        const balloon = document.getElementById('balloon');
        const balloonContainer = document.querySelector('.balloon-container');

        // Create pop particles
        createPopParticles(balloonContainer);

        balloon.classList.add('popped');
        playSound('pumpPop');

        document.getElementById('pump-pump-btn').style.display = 'none';
        document.getElementById('pump-cashout-btn').style.display = 'none';
        document.getElementById('pump-result').textContent = '💥 Popped! Lost $' + pumpBetAmount.toFixed(2);
        document.getElementById('pump-result').style.color = '#ff4757';
        showToast('💥 Balloon popped! Lost $' + pumpBetAmount.toFixed(2), 'error');

        setTimeout(function() {
            balloon.classList.remove('popped');
            // Balloon stays same size
            document.getElementById('pump-start-btn').style.display = 'block';
            document.getElementById('pump-result').textContent = '';
            updatePumpDisplay();
        }, 2000);

        return;
    }

    pumpCount++;
    pumpMultiplier += 0.10;
    pumpPopChance += 0.015;

    const balloon = document.getElementById('balloon');
    balloon.classList.add('pumping');
    playSound('pumpPump');

    setTimeout(function() { balloon.classList.remove('pumping'); }, 300);

    updatePumpDisplay();
}

function cashoutPump() {
    if (!pumpActive) return;
    
    pumpActive = false;
    
    const winAmount = pumpBetAmount * pumpMultiplier;
    balance += winAmount;
    trackResult('pump', pumpBetAmount, winAmount);
    updateBalance();
    
    playWinSound(winAmount);
    
    const balloon = document.getElementById('balloon');
    // Balloon stays same size
    
    document.getElementById('pump-pump-btn').style.display = 'none';
    document.getElementById('pump-cashout-btn').style.display = 'none';
    document.getElementById('pump-result').textContent = 'Cashed out! Won $' + (winAmount - pumpBetAmount).toFixed(2) + ' (' + pumpMultiplier.toFixed(2) + 'x)';
    document.getElementById('pump-result').style.color = '#00e701';
    showToast('Won $' + (winAmount - pumpBetAmount).toFixed(2) + '!', 'success');
    
    if (winAmount - pumpBetAmount >= 100) createConfetti();
    
    setTimeout(function() {
        document.getElementById('pump-start-btn').style.display = 'block';
        document.getElementById('pump-result').textContent = '';
        pumpCount = 0;
        pumpPopChance = 0.05;
        updatePumpDisplay();
    }, 3000);
}

function updatePumpDisplay() {
    document.getElementById('pump-multiplier').textContent = pumpMultiplier.toFixed(2) + 'x';
    document.getElementById('pump-count').textContent = pumpCount;
    document.getElementById('pump-pop-chance').textContent = (pumpPopChance * 100).toFixed(1) + '%';
    
    const balloon = document.getElementById('balloon');
    // Balloon stays same size - no scaling or movement
    
    const popChanceEl = document.getElementById('pump-pop-chance');
    if (pumpPopChance > 0.3) {
        popChanceEl.style.color = '#ff4757';
    } else if (pumpPopChance > 0.15) {
        popChanceEl.style.color = '#ffc800';
    } else {
        popChanceEl.style.color = '#00e701';
    }
}

// ===== DRILL GAME =====
let drillActive = false;
let drillBetAmount = 0;
let drillTarget = 2.00;
let drillSelected = -1;
let drillPaths = [];

function selectDrill(index) {
    if (drillActive) return;
    
    drillSelected = index;
    
    document.querySelectorAll('.drill-choice').forEach(function(btn, i) {
        if (i === index) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function startDrill() {
    const betAmount = parseFloat(document.getElementById('drill-bet').value);
    const target = parseFloat(document.getElementById('drill-target').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    if (drillSelected === -1) {
        showToast('Please select a drill!', 'error');
        return;
    }
    
    if (isNaN(target) || target < 1.1) {
        showToast('Invalid target multiplier!', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('drill', betAmount);
    updateBalance();
    
    drillActive = true;
    drillBetAmount = betAmount;
    drillTarget = target;
    
    document.getElementById('drill-start-btn').disabled = true;
    document.getElementById('drill-result').textContent = 'Drilling...';
    document.getElementById('drill-result').style.color = '#b1bad3';
    
    drillPaths = [];
    for (let i = 0; i < 3; i++) {
        const path = generateDrillPath(target);
        drillPaths.push(path);
    }
    
    animateDrills();
}

function generateDrillPath(target) {
    // Harder difficulty: Lower base chance and higher penalty for higher targets
    const reachesTarget = Math.random() < (0.45 - (target - 1.1) * 0.025);
    
    const segments = [];
    let currentMultiplier = 1.0;
    const increment = 0.1;
    
    if (reachesTarget) {
        while (currentMultiplier < target) {
            currentMultiplier += increment;
            segments.push({ multiplier: currentMultiplier, stop: false });
        }
    } else {
        const stopPoint = 1.1 + Math.random() * (target - 1.1) * 0.9;
        while (currentMultiplier < stopPoint) {
            currentMultiplier += increment;
            segments.push({ multiplier: currentMultiplier, stop: false });
        }
        segments.push({ multiplier: currentMultiplier, stop: true });
    }
    
    return { segments: segments, reachesTarget: reachesTarget };
}

function animateDrills() {
    for (let i = 0; i < 3; i++) {
        document.getElementById('drill-progress-' + i).innerHTML = '';
    }
    
    const maxSegments = Math.max.apply(Math, drillPaths.map(function(p) { return p.segments.length; }));
    
    for (let segIndex = 0; segIndex < maxSegments; segIndex++) {
        setTimeout(function() {
            for (let drillIndex = 0; drillIndex < 3; drillIndex++) {
                const path = drillPaths[drillIndex];
                if (segIndex < path.segments.length) {
                    const segment = path.segments[segIndex];
                    const progressDiv = document.getElementById('drill-progress-' + drillIndex);
                    
                    const segDiv = document.createElement('div');
                    segDiv.className = 'drill-segment' + (segment.stop ? ' stop' : '');
                    progressDiv.appendChild(segDiv);
                    
                    const multDiv = progressDiv.parentElement.querySelector('.drill-multiplier');
                    if (!multDiv) {
                        const newMultDiv = document.createElement('div');
                        newMultDiv.className = 'drill-multiplier';
                        newMultDiv.textContent = segment.multiplier.toFixed(2) + 'x';
                        progressDiv.parentElement.appendChild(newMultDiv);
                    } else {
                        multDiv.textContent = segment.multiplier.toFixed(2) + 'x';
                    }
                    
                    playSound('ding');
                }
            }
            
            if (segIndex === maxSegments - 1) {
                setTimeout(function() { finishDrill(); }, 500);
            }
        }, segIndex * 200);
    }
}

function finishDrill() {
    const selectedPath = drillPaths[drillSelected];
    
    document.querySelectorAll('.drill-path').forEach(function(path, i) {
        if (i === drillSelected) {
            if (selectedPath.reachesTarget) {
                path.classList.add('winner');
            } else {
                path.classList.add('loser');
            }
        } else {
            path.classList.add('loser');
        }
    });
    
    const resultDiv = document.getElementById('drill-result');
    
    if (selectedPath.reachesTarget) {
        const winAmount = drillBetAmount * drillTarget;
        balance += winAmount;
        trackResult('drill', drillBetAmount, winAmount);
        updateBalance();
        
        playWinSound(winAmount);
        resultDiv.textContent = '🎉 Target reached! Won $' + (winAmount - drillBetAmount).toFixed(2) + ' (' + drillTarget.toFixed(2) + 'x)';
        resultDiv.style.color = '#00e701';
        showToast('Won $' + (winAmount - drillBetAmount).toFixed(2) + '!', 'success');
        
        if (winAmount - drillBetAmount >= 100) createConfetti();
    } else {
        trackResult('drill', drillBetAmount, 0);
        playSound('lose');
        resultDiv.textContent = 'Drill stopped! Lost $' + drillBetAmount.toFixed(2);
        resultDiv.style.color = '#ff4757';
        showToast('Drill stopped! Lost $' + drillBetAmount.toFixed(2), 'error');
    }
    
    setTimeout(function() {
        drillActive = false;
        drillSelected = -1;
        document.getElementById('drill-start-btn').disabled = false;
        document.querySelectorAll('.drill-choice').forEach(function(btn) { btn.classList.remove('selected'); });
        document.querySelectorAll('.drill-path').forEach(function(path) {
            path.classList.remove('winner', 'loser');
        });
        resultDiv.textContent = '';
    }, 4000);
}

function createPopParticles(container) {
    const particleCount = 20;
    const colors = ['#ff1744', '#ff6b9d', '#c41c3b', '#ff4757', '#ffc800', '#ffed4e'];
    
    // Create shockwave
    const shockwave = document.createElement('div');
    shockwave.className = 'pop-shockwave';
    shockwave.style.left = '50%';
    shockwave.style.top = '40%';
    container.appendChild(shockwave);
    setTimeout(function() { shockwave.remove(); }, 600);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'pop-particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (10 + Math.random() * 12) + 'px';
        particle.style.height = particle.style.width;
        
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
        const distance = 100 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = '50%';
        particle.style.top = '40%';
        
        container.appendChild(particle);
        
        setTimeout(function() {
            particle.remove();
        }, 800);
    }
    

}


// ===== DIAMONDS GAME =====
const gemTypes = ['💎', '♦️', '🟢', '🟡', '🟣', '🩷', '🔷', '🟠'];
let diamondsCooldown = false;

function playDiamonds() {
    if (diamondsCooldown) {
        showToast('Please wait...', 'error');
        return;
    }

    const betAmount = parseFloat(document.getElementById('diamonds-bet').value);

    if (isNaN(betAmount) || betAmount <= 0) {
        showToast('Please enter a valid bet amount', 'error');
        return;
    }

    if (betAmount > balance) {
        showToast('Insufficient balance', 'error');
        return;
    }

    diamondsCooldown = true;

    balance -= betAmount;
    updateBalance();

    // Track bet
    trackBet('diamonds', betAmount);

    playSound('buttonClick');

    // Roll 5 random gems
    const gems = [];
    const gemElements = document.querySelectorAll('.gem');

    // Remove all previous classes
    gemElements.forEach((gem) => {
        gem.classList.remove('matched', 'rolling');
    });

    gemElements.forEach((gem, index) => {
        gem.classList.add('rolling');
        setTimeout(() => {
            const randomGem = gemTypes[Math.floor(Math.random() * gemTypes.length)];
            gems.push(randomGem);
            gem.textContent = randomGem;
            gem.classList.remove('rolling');
            // Restore floating animation with proper delay
            const delays = ['0s', '0.2s', '0.4s', '0.6s', '0.8s'];
            gem.style.animation = `gemFloat 2s ease-in-out ${delays[index]} infinite`;
            playSound('diamondsEach'); // Play sound for each gem
        }, 600 + (index * 150));
    });

    // Calculate result after all gems are rolled
    setTimeout(() => {
        const result = calculateDiamondsResult(gems, betAmount);

        // Highlight all matching symbols (any symbol that appears 2+ times)
        if (result.win > 0) {
            const counts = {};
            gems.forEach(gem => counts[gem] = (counts[gem] || 0) + 1);

            // Find all symbols that have 2 or more matches
            const matchedSymbols = Object.keys(counts).filter(gem => counts[gem] >= 2);

            gemElements.forEach((gem, index) => {
                if (matchedSymbols.includes(gem.textContent)) {
                    gem.classList.add('matched');
                    // Remove matched class after animation completes to restore floating
                    setTimeout(() => {
                        gem.classList.remove('matched');
                        // Restore floating animation with proper delay
                        const delays = ['0s', '0.2s', '0.4s', '0.6s', '0.8s'];
                        gem.style.animation = `gemFloat 2s ease-in-out ${delays[index]} infinite`;
                    }, 2000);
                }
            });
        }

        document.getElementById('diamonds-result').textContent = result.message;
        document.getElementById('diamonds-result').style.color = result.win > 0 ? '#00e701' : '#ff4757';

        if (result.win > 0) {
            balance += result.win;
            trackResult('diamonds', betAmount, result.win);
            updateBalance();

            playSound('cashPayoutMedium');
            showToast(result.message, 'success');
        } else {
            trackResult('diamonds', betAmount, 0);
            playSound('loose');
            showToast('No match - Try again!', 'error');
        }

        diamondsCooldown = false;
    }, 1400);
}

function createGemParticles(gemElement) {
    // Removed - no more sparkle particles
}

function calculateDiamondsResult(gems, betAmount) {
    // Count all matching symbols
    const counts = {};
    gems.forEach(gem => counts[gem] = (counts[gem] || 0) + 1);

    let totalWin = 0;
    let messages = [];

    // Check each gem type and award for matches
    Object.entries(counts).forEach(([gem, count]) => {
        if (count === 5) {
            // Five of a kind - 50x
            totalWin += betAmount * 50;
            messages.push(`${gem} x5: 50x`);
        } else if (count === 4) {
            // Four of a kind - 10x
            totalWin += betAmount * 10;
            messages.push(`${gem} x4: 10x`);
        } else if (count === 3) {
            // Three of a kind - 3x
            totalWin += betAmount * 3;
            messages.push(`${gem} x3: 3x`);
        } else if (count === 2) {
            // Pair - 2x
            totalWin += betAmount * 2;
            messages.push(`${gem} x2: 2x`);
        }
    });

    if (totalWin > 0) {
        const multiplier = (totalWin / betAmount).toFixed(1);
        const message = messages.join(' + ') + ` = ${totalWin.toFixed(2)} (${multiplier}x)`;
        return { win: totalWin, message: '💎 ' + message };
    }

    return { win: 0, message: 'No Match - Lost $' + betAmount.toFixed(2) };
}

// ===== DARTS GAME =====
let dartsCooldown = false;
function throwDart() {
    if (dartsCooldown) { showToast("Please wait...", "error"); return; }
    dartsCooldown = true; setTimeout(() => { dartsCooldown = false; }, 2000);
    const betAmount = parseFloat(document.getElementById('darts-bet').value);
    const difficulty = document.getElementById('darts-difficulty').value;
    
    if (isNaN(betAmount) || betAmount <= 0) {
        showToast('Please enter a valid bet amount', 'error');
        return;
    }
    
    if (betAmount > balance) {
        showToast('Insufficient balance', 'error');
        return;
    }
    
    balance -= betAmount;
    updateBalance();
    
    // Track bet
    gameStats.totalWagered += betAmount;
    lastBetAmount = betAmount;
    
    playSound('dartsThrow');
    
    // Reset displays
    const multiplierDisplay = document.getElementById('multiplier-value-large');
    multiplierDisplay.textContent = '...';
    multiplierDisplay.className = 'multiplier-value-large';
    
    const hitText = document.getElementById('dart-hit-text');
    hitText.textContent = '';
    hitText.className = 'dart-hit-text';
    
    // Get random position on dartboard
    const angle = Math.random() * 360;
    const maxDistance = 225; // Radius of dartboard
    const distance = Math.random() * maxDistance;
    
    const x = 225 + distance * Math.cos(angle * Math.PI / 180);
    const y = 225 + distance * Math.sin(angle * Math.PI / 180);
    
    // Show dart point
    const dartSimple = document.getElementById('dart-simple');
    dartSimple.style.left = x + 'px';
    dartSimple.style.top = y + 'px';
    dartSimple.style.display = 'block';
    
    // Create impact wave
    setTimeout(() => {
        createDartWave(x, y);
        
        // Calculate multiplier
        const multiplier = getDartMultiplier(difficulty, distance, maxDistance);
        
        // Show hit text
        setTimeout(() => {
            hitText.textContent = multiplier.toFixed(2) + 'x';
            hitText.className = 'dart-hit-text show';
            
            if (multiplier >= 10) {
                hitText.style.color = '#00e701';
                hitText.style.textShadow = '0 0 40px rgba(0, 231, 1, 1), 0 0 80px rgba(0, 231, 1, 0.8), 0 5px 20px rgba(0, 0, 0, 0.9)';
            } else if (multiplier < 1) {
                hitText.style.color = '#ff4757';
                hitText.style.textShadow = '0 0 40px rgba(255, 71, 87, 1), 0 0 80px rgba(255, 71, 87, 0.8), 0 5px 20px rgba(0, 0, 0, 0.9)';
            } else {
                hitText.style.color = '#ffd700';
                hitText.style.textShadow = '0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 215, 0, 0.8), 0 5px 20px rgba(0, 0, 0, 0.9)';
            }
        }, 100);
        
        // Update multiplier display
        setTimeout(() => {
            multiplierDisplay.textContent = multiplier.toFixed(2) + 'x';
            
            if (multiplier >= 10) {
                multiplierDisplay.className = 'multiplier-value-large high-multiplier';
            } else if (multiplier < 1) {
                multiplierDisplay.className = 'multiplier-value-large low-multiplier';
            } else {
                multiplierDisplay.className = 'multiplier-value-large';
            }
        }, 300);
        
        // Calculate winnings
        setTimeout(() => {
            const winAmount = betAmount * multiplier;
            balance += winAmount;
            trackResult('darts', betAmount, winAmount);
            updateBalance();
            
            const profit = winAmount - betAmount;
            
            document.getElementById('darts-result').textContent = 
                'Won $' + winAmount.toFixed(2) + ' (Profit: $' + profit.toFixed(2) + ')';
            document.getElementById('darts-result').style.color = color;
            
            if (multiplier >= 50) {
                playSound('jackpot');
                showToast('🎯 MASSIVE HIT! ' + multiplier.toFixed(2) + 'x!', 'success');
            } else if (profit > betAmount * 2) {
                playSound('cashPayoutLarge');
                showToast('🎯 Big Hit! ' + multiplier.toFixed(2) + 'x!', 'success');
            } else if (profit > 0) {
                playSound('cashPayoutMedium');
                showToast('🎯 Hit ' + multiplier.toFixed(2) + 'x!', 'success');
            } else {
                playSound('loose');
            }
            
            // Remove dart after delay
            setTimeout(() => {
                dartSimple.style.display = 'none';
            }, 2000);
        }, 600);
    }, 200);
}

function createDartWave(x, y) {
    const dartboard = document.querySelector('.dartboard-simple');
    
    // Create impact wave
    const wave = document.createElement('div');
    wave.className = 'dart-impact-wave';
    wave.style.left = x + 'px';
    wave.style.top = y + 'px';
    dartboard.appendChild(wave);
    setTimeout(() => wave.remove(), 1000);
}

function getDartMultiplier(difficulty, distance, maxDistance) {
    const distanceRatio = distance / maxDistance;
    
    // Bullseye (center) - highest multipliers, smaller zone
    if (distanceRatio < 0.05) {
        const bullseyeMultipliers = {
            easy: [5, 8, 10, 15],
            medium: [10, 15, 25, 40],
            hard: [20, 35, 60, 100],
            expert: [50, 80, 120, 200]
        };
        return bullseyeMultipliers[difficulty][Math.floor(Math.random() * bullseyeMultipliers[difficulty].length)];
    }
    
    // Inner ring
    if (distanceRatio < 0.18) {
        const innerMultipliers = {
            easy: [1.5, 2, 2.5, 3],
            medium: [3, 5, 8, 12],
            hard: [6, 10, 15, 25],
            expert: [12, 20, 35, 60]
        };
        return innerMultipliers[difficulty][Math.floor(Math.random() * innerMultipliers[difficulty].length)];
    }
    
    // Mid ring
    if (distanceRatio < 0.45) {
        const midMultipliers = {
            easy: [0.5, 0.8, 1, 1.2],
            medium: [1, 1.5, 2, 3],
            hard: [2, 4, 6, 10],
            expert: [4, 8, 15, 25]
        };
        return midMultipliers[difficulty][Math.floor(Math.random() * midMultipliers[difficulty].length)];
    }
    
    // Outer mid ring
    if (distanceRatio < 0.75) {
        const outerMidMultipliers = {
            easy: [0.2, 0.3, 0.5, 0.8],
            medium: [0.3, 0.5, 0.8, 1],
            hard: [0.3, 0.5, 1, 2],
            expert: [0.5, 1, 3, 8]
        };
        return outerMidMultipliers[difficulty][Math.floor(Math.random() * outerMidMultipliers[difficulty].length)];
    }
    
    // Outer ring - mostly losses
    const outerMultipliers = {
        easy: [0.1, 0.2, 0.3, 0.5],
        medium: [0, 0.1, 0.2, 0.4],
        hard: [0, 0, 0.1, 0.3],
        expert: [0, 0, 0, 0.2]
    };
    return outerMultipliers[difficulty][Math.floor(Math.random() * outerMultipliers[difficulty].length)];
}

// ===== CHICKEN GAME =====
let chickenActive = false;
let chickenBetAmount = 0;
let chickenSafetyActive = false; // Protection from chicken shield
function chickenHop() {
    if (!chickenActive || chickenCooldown) return;

    chickenCooldown = true;
    setTimeout(() => { chickenCooldown = false; }, 400); // 400ms cooldown

    const hitChance = getChickenHitChance();

    if (Math.random() < hitChance) {
        // Check if protection is active
        if (chickenSafetyActive) {
            chickenSafetyActive = false;
            showToast('🛡️ Chicken Shield protected you!', 'success');
            playSound('ding');
            
            // Continue as if it was a safe hop
            chickenHops++;
            chickenMultiplier = getChickenMultiplier(chickenHops);

            const chickenIcon = document.getElementById('chicken-icon');
            chickenIcon.classList.add('hopping');

            // Mark previous lane as crossed
            if (chickenHops > 0) {
                chickenLanes[chickenHops - 1].classList.add('crossed');
            }

            setTimeout(() => {
                chickenIcon.classList.remove('hopping');
            }, 600);

            updateChickenDisplay();
            return;
        }
        
        // Chicken got hit!
        chickenActive = false;

        const chickenIcon = document.getElementById('chicken-icon');
        const currentLane = chickenLanes[chickenHops];

        // Create car that hits chicken
        const car = document.createElement('div');
        car.className = 'car-indicator';
        car.textContent = Math.random() > 0.5 ? '🚗' : '🚙';
        car.style.left = '50%';
        car.style.transform = 'translateX(-50%) translateY(-50%)';

        if (Math.random() > 0.5) {
            car.classList.add('car-moving-down');
        } else {
            car.classList.add('car-moving-up');
        }

        currentLane.appendChild(car);

        // Hit chicken after short delay
        setTimeout(() => {
            chickenIcon.classList.add('hit');
            playSound('chickenLoose');
        }, 300);

        document.getElementById('chicken-result').textContent = '💥 Hit by car! Lost $' + chickenBetAmount.toFixed(2);
        document.getElementById('chicken-result').style.color = '#ff4757';
        showToast('💥 Chicken got hit!', 'error');

        // Track loss
        trackResult('chicken', chickenBetAmount, 0);

        setTimeout(() => {
            resetChickenGame();
        }, 2000);
    } else {
        // Safe hop!
        chickenHops++;
        chickenMultiplier = getChickenMultiplier(chickenHops);

        const chickenIcon = document.getElementById('chicken-icon');
        chickenIcon.classList.add('hopping');

        // Mark previous lane as crossed
        if (chickenHops > 0) {
            chickenLanes[chickenHops - 1].classList.add('crossed');
        }

        // Create hop trail
        const trail = document.createElement('div');
        trail.className = 'hop-trail';
        trail.textContent = '💨';
        trail.style.left = (75 + (chickenHops - 1) * 150) + 'px';
        document.getElementById('chicken-world').appendChild(trail);
        setTimeout(() => trail.remove(), 800);

        // Move chicken right
        const newLeft = 75 + (chickenHops * 150);
        chickenIcon.style.left = newLeft + 'px';

        // Move camera to follow chicken (keep chicken centered)
        const world = document.getElementById('chicken-world');
        const viewport = document.getElementById('chicken-viewport');
        const viewportWidth = viewport.offsetWidth;
        const cameraOffset = Math.max(0, newLeft - viewportWidth / 2);
        world.style.transform = `translateX(-${cameraOffset}px)`;

        playSound('buttonClick');

        setTimeout(() => {
            chickenIcon.classList.remove('hopping');
        }, 600);

        updateChickenDisplay();

        // Check if reached max multiplier
        if (chickenMultiplier >= 500) {
            setTimeout(() => {
                showToast('🐔 MAX MULTIPLIER! Auto cashing out!', 'success');
                chickenCashout();
            }, 700);
        }
    }
}
let chickenCooldown = false;
let chickenMultiplier = 1.0;
let chickenDifficulty = 'medium';
let chickenLanes = [];

function initChickenWorld() {
    const world = document.getElementById('chicken-world');
    world.innerHTML = '';
    chickenLanes = [];
    
    // Create start zone
    const startZone = document.createElement('div');
    startZone.className = 'chicken-zone start-zone';
    startZone.textContent = 'START';
    world.appendChild(startZone);
    
    // Create 50 lanes (enough to reach 500x multiplier)
    for (let i = 0; i < 50; i++) {
        const lane = document.createElement('div');
        lane.className = 'chicken-lane';
        lane.dataset.laneIndex = i;
        
        const laneNumber = document.createElement('div');
        laneNumber.className = 'lane-number';
        laneNumber.textContent = i + 1;
        lane.appendChild(laneNumber);
        
        world.appendChild(lane);
        chickenLanes.push(lane);
    }
    
    // Add chicken icon
    const chickenIcon = document.createElement('div');
    chickenIcon.id = 'chicken-icon';
    chickenIcon.className = 'chicken-icon';
    chickenIcon.textContent = '🐔';
    world.appendChild(chickenIcon);
    
    // Reset camera position
    world.style.transform = 'translateX(0)';
}

function startChicken() {
    const betAmount = parseFloat(document.getElementById('chicken-bet').value);
    chickenDifficulty = document.getElementById('chicken-difficulty').value;
    
    if (isNaN(betAmount) || betAmount <= 0) {
        showToast('Please enter a valid bet amount', 'error');
        return;
    }
    
    if (betAmount > balance) {
        showToast('Insufficient balance', 'error');
        return;
    }
    
    balance -= betAmount;
    updateBalance();
    
    chickenActive = true;
    chickenBetAmount = betAmount;
    chickenHops = 0;
    chickenMultiplier = 1.0;
    
    // Track bet
    gameStats.totalWagered += betAmount;
    lastBetAmount = betAmount;
    
    playSound('buttonClick');
    
    initChickenWorld();
    
    document.getElementById('chicken-start-btn').style.display = 'none';
    document.getElementById('chicken-hop-btn').style.display = 'block';
    document.getElementById('chicken-cashout-btn').style.display = 'block';
    document.getElementById('chicken-bet').disabled = true;
    document.getElementById('chicken-difficulty').disabled = true;
    
    const chickenIcon = document.getElementById('chicken-icon');
    chickenIcon.style.left = '75px';
    chickenIcon.style.display = 'block';
    chickenIcon.classList.remove('hit');
    
    updateChickenDisplay();
}

function chickenHop() {
    if (!chickenActive) return;
    
    const hitChance = getChickenHitChance();
    
    if (Math.random() < hitChance) {
        // Chicken got hit!
        chickenActive = false;
        
        const chickenIcon = document.getElementById('chicken-icon');
        const currentLane = chickenLanes[chickenHops];
        
        // Create car that hits chicken
        const car = document.createElement('div');
        car.className = 'car-indicator';
        car.textContent = Math.random() > 0.5 ? '🚗' : '🚙';
        car.style.left = '50%';
        car.style.transform = 'translateX(-50%) translateY(-50%)';
        
        if (Math.random() > 0.5) {
            car.classList.add('car-moving-down');
        } else {
            car.classList.add('car-moving-up');
        }
        
        currentLane.appendChild(car);
        
        // Hit chicken after short delay
        setTimeout(() => {
            chickenIcon.classList.add('hit');
            playSound('chickenLoose');
        }, 300);
        
        document.getElementById('chicken-result').textContent = '💥 Hit by car! Lost $' + chickenBetAmount.toFixed(2);
        document.getElementById('chicken-result').style.color = '#ff4757';
        showToast('💥 Chicken got hit!', 'error');
        
        // Track loss
        trackResult('chicken', chickenBetAmount, 0);
        
        setTimeout(() => {
            resetChickenGame();
        }, 2000);
    } else {
        // Safe hop!
        chickenHops++;
        chickenMultiplier = getChickenMultiplier(chickenHops);
        
        const chickenIcon = document.getElementById('chicken-icon');
        chickenIcon.classList.add('hopping');
        
        // Mark previous lane as crossed
        if (chickenHops > 0) {
            chickenLanes[chickenHops - 1].classList.add('crossed');
        }
        
        // Create hop trail
        const trail = document.createElement('div');
        trail.className = 'hop-trail';
        trail.textContent = '💨';
        trail.style.left = (75 + (chickenHops - 1) * 150) + 'px';
        document.getElementById('chicken-world').appendChild(trail);
        setTimeout(() => trail.remove(), 800);
        
        // Move chicken right
        const newLeft = 75 + (chickenHops * 150);
        chickenIcon.style.left = newLeft + 'px';
        
        // Move camera to follow chicken (keep chicken centered)
        const world = document.getElementById('chicken-world');
        const viewport = document.getElementById('chicken-viewport');
        const viewportWidth = viewport.offsetWidth;
        const cameraOffset = Math.max(0, newLeft - viewportWidth / 2);
        world.style.transform = `translateX(-${cameraOffset}px)`;
        
        playSound('buttonClick');
        
        setTimeout(() => {
            chickenIcon.classList.remove('hopping');
        }, 600);
        
        updateChickenDisplay();
        
        // Check if reached max multiplier
        if (chickenMultiplier >= 500) {
            setTimeout(() => {
                showToast('🐔 MAX MULTIPLIER! Auto cashing out!', 'success');
                chickenCashout();
            }, 700);
        }
    }
}

function chickenCashout() {
    if (!chickenActive) return;

    chickenActive = false;

    const winAmount = chickenBetAmount * chickenMultiplier;
    balance += winAmount;
    trackResult('chicken', chickenBetAmount, winAmount);
    updateBalance();

    const profit = winAmount - chickenBetAmount;

    if (chickenMultiplier >= 100) {
        playSound('jackpot');
    } else if (chickenMultiplier >= 20) {
        playSound('cashPayoutLarge');
    } else {
        playSound('cashPayoutMedium');
    }

    document.getElementById('chicken-result').textContent =
        '🐔 Cashed Out! Won $' + winAmount.toFixed(2) + ' (' + chickenMultiplier.toFixed(2) + 'x)';
    document.getElementById('chicken-result').style.color = '#00e701';
    showToast('🐔 Safe! Won $' + profit.toFixed(2), 'success');

    // Reset game after short delay
    setTimeout(() => {
        resetChickenGame();
    }, 1500);
}

function resetChickenGame() {
    chickenActive = false;
    chickenBetAmount = 0;
    chickenHops = 0;
    chickenMultiplier = 1.0;
    
    // Reset chicken position
    const chickenIcon = document.getElementById('chicken-icon');
    chickenIcon.style.left = '75px';
    chickenIcon.classList.remove('hit', 'hopping');
    
    // Reset world position
    const world = document.getElementById('chicken-world');
    world.style.transform = 'translateX(0px)';
    
    // Clear all crossed lanes
    const lanes = document.querySelectorAll('.chicken-lane');
    lanes.forEach(lane => lane.classList.remove('crossed'));
    
    document.getElementById('chicken-start-btn').style.display = 'block';
    document.getElementById('chicken-hop-btn').style.display = 'none';
    document.getElementById('chicken-cashout-btn').style.display = 'none';
    document.getElementById('chicken-bet').disabled = false;
    document.getElementById('chicken-difficulty').disabled = false;
    document.getElementById('chicken-result').textContent = '';
    
    updateChickenDisplay();
}

function updateChickenDisplay() {
    // Calculate risk based on NEXT hop (what will happen if you hop again)
    const nextHopCount = chickenHops;
    const baseChances = {
        easy: 0.06,
        medium: 0.10,
        hard: 0.16
    };
    const baseChance = baseChances[chickenDifficulty];
    const hitChance = Math.min(0.45, baseChance + (nextHopCount * 0.006));
    
    document.getElementById('chicken-risk').textContent = (hitChance * 100).toFixed(1) + '%';
    document.getElementById('chicken-multiplier').textContent = chickenMultiplier.toFixed(2) + 'x';
    document.getElementById('chicken-potential').textContent = (chickenBetAmount * chickenMultiplier).toFixed(2);
}

function getChickenHitChance() {
    const baseChances = {
        easy: 0.06,
        medium: 0.10,
        hard: 0.16
    };
    
    const baseChance = baseChances[chickenDifficulty];
    // Gradually increase chance with each hop (slower increase)
    return Math.min(0.45, baseChance + (chickenHops * 0.006));
}

function getChickenMultiplier(hops) {
    // Progressive multiplier system that can reach 500x
    const multiplierIncreases = {
        easy: 0.12,
        medium: 0.20,
        hard: 0.35
    };
    
    const increase = multiplierIncreases[chickenDifficulty];
    
    // Exponential growth for higher multipliers
    if (hops <= 10) {
        return 1.0 + (hops * increase);
    } else if (hops <= 20) {
        const base = 1.0 + (10 * increase);
        return base + ((hops - 10) * increase * 1.5);
    } else if (hops <= 30) {
        const base = 1.0 + (10 * increase) + (10 * increase * 1.5);
        return base + ((hops - 20) * increase * 2);
    } else {
        const base = 1.0 + (10 * increase) + (10 * increase * 1.5) + (10 * increase * 2);
        return Math.min(500, base + ((hops - 30) * increase * 3));
    }
}


// ===== STATISTICS TRACKING =====
let gameStats = {
    overall: {
        totalWagered: 0,
        totalWon: 0,
        totalLost: 0,
        wins: 0,
        losses: 0,
        profitHistory: []
    },
    dice: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    plinko: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    mines: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    limbo: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    crash: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    roulette: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    coinflip: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    keno: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    stocks: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    slots: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    tower: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    cases: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    scratch: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    packs: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    pump: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    drill: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    diamonds: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    darts: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    chicken: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    hilo: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    tarot: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    snakes: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    blackjack: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    baccarat: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    videopoker: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    rps: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
    holdem: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] }
};

let lastBetAmount = 0;

function trackBet(gameName, betAmount) {
    lastBetAmount = betAmount;
    
    // Track in specific game
    if (gameStats[gameName]) {
        gameStats[gameName].totalWagered += betAmount;
    }
    
    // Track in overall
    gameStats.overall.totalWagered += betAmount;
    
    updateStatsDisplay();
}

function trackResult(gameName, betAmount, winAmount) {
    const profit = winAmount - betAmount;
    
    // Track in specific game
    if (gameStats[gameName]) {
        if (profit > 0) {
            gameStats[gameName].wins++;
            gameStats[gameName].totalWon += winAmount;
        } else {
            gameStats[gameName].losses++;
            gameStats[gameName].totalLost += betAmount;
        }
        
        const gameProfit = gameStats[gameName].totalWon - gameStats[gameName].totalLost;
        gameStats[gameName].profitHistory.push(gameProfit);
        if (gameStats[gameName].profitHistory.length > 50) {
            gameStats[gameName].profitHistory.shift();
        }
    }
    
    // Track in overall
    if (profit > 0) {
        gameStats.overall.wins++;
        gameStats.overall.totalWon += winAmount;
    } else {
        gameStats.overall.losses++;
        gameStats.overall.totalLost += betAmount;
    }
    
    const overallProfit = gameStats.overall.totalWon - gameStats.overall.totalLost;
    gameStats.overall.profitHistory.push(overallProfit);
    if (gameStats.overall.profitHistory.length > 50) {
        gameStats.overall.profitHistory.shift();
    }
    
    updateStatsDisplay();
    updateMiniGraph();
}

function updateStatsDisplay() {
    // Use current game's stats, not overall
    const stats = gameStats[currentStatsGame];
    if (!stats) return; // Safety check

    const netProfit = stats.totalWon - stats.totalLost;

    // Update top bar - check if elements exist
    const wageredEl = document.getElementById('total-wagered');
    const profitEl = document.getElementById('total-profit');
    const ratioEl = document.getElementById('win-loss-ratio');

    if (wageredEl) wageredEl.textContent = '$' + stats.totalWagered.toFixed(2);
    if (profitEl) {
        profitEl.textContent = '$' + netProfit.toFixed(2);
        profitEl.className = 'stats-value profit';
        if (netProfit < 0) {
            profitEl.classList.add('negative');
        }
    }
    if (ratioEl) ratioEl.textContent = stats.wins + '/' + stats.losses;

    // Update panel - check if elements exist
    const panelWageredEl = document.getElementById('panel-wagered');
    const panelWonEl = document.getElementById('panel-won');
    const panelLostEl = document.getElementById('panel-lost');
    const panelProfitEl = document.getElementById('panel-profit');
    const panelWinsEl = document.getElementById('panel-wins');
    const panelLossesEl = document.getElementById('panel-losses');

    if (panelWageredEl) panelWageredEl.textContent = '$' + stats.totalWagered.toFixed(2);
    if (panelWonEl) panelWonEl.textContent = '$' + stats.totalWon.toFixed(2);
    if (panelLostEl) panelLostEl.textContent = '$' + stats.totalLost.toFixed(2);
    if (panelProfitEl) {
        panelProfitEl.textContent = '$' + netProfit.toFixed(2);
        panelProfitEl.className = 'stat-card-value profit-value';
        if (netProfit < 0) {
            panelProfitEl.classList.add('negative');
        }
    }
    if (panelWinsEl) panelWinsEl.textContent = stats.wins;
    if (panelLossesEl) panelLossesEl.textContent = stats.losses;
}

function updateMiniGraph() {
    const canvas = document.getElementById('mini-graph-canvas');
    if (!canvas) return; // Safety check

    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const stats = gameStats[currentStatsGame];
    if (!stats || stats.profitHistory.length < 2) return;

    const data = stats.profitHistory;
    const max = Math.max(...data, 0);
    const min = Math.min(...data, 0);
    const range = max - min || 1;

    const width = canvas.width;
    const height = canvas.height;
    const step = width / (data.length - 1);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = data[data.length - 1] >= 0 ? '#00e701' : '#ff4757';
    ctx.lineWidth = 2;

    data.forEach((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function updateFullGraph() {
    const canvas = document.getElementById('stats-graph-canvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const stats = gameStats[currentStatsGame];
    if (stats.profitHistory.length < 2) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet - play some games!', canvas.width / 2, canvas.height / 2);
        return;
    }

    const data = stats.profitHistory;
    const max = Math.max(...data, 0);
    const min = Math.min(...data, 0);
    const range = max - min || 1;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const step = graphWidth / (data.length - 1);

    // Draw zero line
    const zeroY = padding + graphHeight - ((-min) / range) * graphHeight;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, zeroY);
    ctx.lineTo(width - padding, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw profit line
    ctx.beginPath();
    ctx.strokeStyle = data[data.length - 1] >= 0 ? '#00e701' : '#ff4757';
    ctx.lineWidth = 3;

    data.forEach((value, index) => {
        const x = padding + index * step;
        const y = padding + graphHeight - ((value - min) / range) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Fill area under curve
    ctx.lineTo(width - padding, zeroY);
    ctx.lineTo(padding, zeroY);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    if (data[data.length - 1] >= 0) {
        gradient.addColorStop(0, 'rgba(0, 231, 1, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 231, 1, 0)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 71, 87, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');
    }
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('$' + max.toFixed(0), padding - 5, padding + 5);
    ctx.fillText('$' + min.toFixed(0), padding - 5, height - padding + 5);
    ctx.fillText('$0', padding - 5, zeroY + 5);
}

function toggleStatsPanel() {
    const panel = document.getElementById('stats-panel');
    panel.style.display = 'flex';
    updateFullGraph();
}

function closeStatsPanel() {
    document.getElementById('stats-panel').style.display = 'none';
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics?')) {
        gameStats = {
            overall: {
                totalWagered: 0,
                totalWon: 0,
                totalLost: 0,
                wins: 0,
                losses: 0,
                profitHistory: []
            },
            dice: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            plinko: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            mines: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            limbo: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            crash: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            roulette: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            coinflip: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            keno: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            stocks: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            slots: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            tower: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            cases: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            scratch: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            packs: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            pump: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            drill: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            diamonds: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            darts: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            chicken: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            hilo: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            tarot: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            snakes: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            blackjack: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            baccarat: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            videopoker: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            rps: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] },
            holdem: { totalWagered: 0, totalWon: 0, totalLost: 0, wins: 0, losses: 0, profitHistory: [] }
        };
        updateStatsDisplay();
        updateMiniGraph();
        updateFullGraph();
        showToast('Statistics reset!', 'success');
    }
}

// Modify existing game functions to track stats


// ===== HI-LO GAME =====
let hiloActive = false;
let hiloBetAmount = 0;
let hiloCards = 0;
let hiloMultiplier = 1.00;
let hiloCurrentCard = null;
const hiloCardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getCardNumericValue(card) {
    if (card === 'A') return 1;
    if (card === 'J') return 11;
    if (card === 'Q') return 12;
    if (card === 'K') return 13;
    return parseInt(card);
}

function drawRandomCard() {
    return hiloCardValues[Math.floor(Math.random() * hiloCardValues.length)];
}

function startHilo() {
    const betAmount = parseFloat(document.getElementById('hilo-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    hiloBetAmount = betAmount;
    trackBet('hilo', betAmount);
    updateBalance();
    
    hiloActive = true;
    hiloCards = 0;
    hiloMultiplier = 1.00;
    hiloCurrentCard = drawRandomCard();
    
    document.getElementById('hilo-current-card').querySelector('.card-value').textContent = hiloCurrentCard;
    document.getElementById('hilo-start-btn').style.display = 'none';
    document.getElementById('hilo-cashout-btn').style.display = 'block';
    document.getElementById('hilo-buttons').style.display = 'flex';
    document.getElementById('hilo-result').textContent = '';
    
    updateHiloDisplay();
    playSound('buttonClick');
}

function hiloGuess(choice) {
    if (!hiloActive) return;

    const nextCard = drawRandomCard();
    const currentValue = getCardNumericValue(hiloCurrentCard);
    const nextValue = getCardNumericValue(nextCard);

    let correct = false;
    if (choice === 'higher' && nextValue > currentValue) correct = true;
    if (choice === 'lower' && nextValue < currentValue) correct = true;
    if (nextValue === currentValue) correct = true; // Same card = win

    // Add flip animation
    const cardElement = document.getElementById('hilo-current-card');
    cardElement.classList.add('flip');

    // Disable buttons during animation
    document.getElementById('hilo-buttons').style.pointerEvents = 'none';

    // Show next card after flip animation
    setTimeout(() => {
        cardElement.querySelector('.card-value').textContent = nextCard;
        cardElement.classList.remove('flip');
    }, 300);

    setTimeout(() => {
        document.getElementById('hilo-buttons').style.pointerEvents = 'auto';
        
        if (correct) {
            hiloCards++;
            // Multiplier increases based on probability
            const range = 13;
            const higherCards = range - currentValue;
            const lowerCards = currentValue - 1;
            const probability = choice === 'higher' ? higherCards / range : lowerCards / range;
            const multiplierIncrease = probability > 0 ? (0.9 / probability) : 1.5;
            hiloMultiplier *= multiplierIncrease;

            hiloCurrentCard = nextCard;
            
            // Win animation
            cardElement.classList.add('win');
            setTimeout(() => cardElement.classList.remove('win'), 800);
            
            updateHiloDisplay();
            playSound('ding');
            
            const profit = hiloMultiplier * hiloBetAmount - hiloBetAmount;
            createParticles('+' + profit.toFixed(2), '#00e701');
            
            // Create extra particles for big wins
            if (hiloMultiplier >= 10) {
                setTimeout(() => createParticles('🔥 ' + hiloMultiplier.toFixed(2) + 'x', '#ffa502'), 200);
            }
            if (hiloMultiplier >= 50) {
                createConfetti();
            }

            // Check if reached max multiplier
            if (hiloMultiplier >= 1000) {
                showToast('🎉 MAX MULTIPLIER! Auto cashing out!', 'success');
                setTimeout(() => hiloCashout(), 500);
            }
        } else {
            // Lost - shake animation
            cardElement.classList.add('lose');
            setTimeout(() => cardElement.classList.remove('lose'), 600);
            
            hiloActive = false;
            trackResult('hilo', hiloBetAmount, 0);
            playSound('lose');
            createParticles('-' + hiloBetAmount.toFixed(2), '#ff4757');

            document.getElementById('hilo-result').textContent = '❌ Wrong! Lost $' + hiloBetAmount.toFixed(2);
            document.getElementById('hilo-result').style.color = '#ff4757';
            showToast('Lost $' + hiloBetAmount.toFixed(2), 'error');

            setTimeout(() => resetHilo(), 2000);
        }
    }, 600);
}


function hiloCashout() {
    if (!hiloActive) return;
    
    hiloActive = false;
    const winAmount = hiloBetAmount * hiloMultiplier;
    balance += winAmount;
    trackResult('hilo', hiloBetAmount, winAmount);
    updateBalance();
    
    const profit = winAmount - hiloBetAmount;
    playWinSound(profit);
    
    // Big win effects
    if (hiloMultiplier >= 10) {
        createConfetti();
    }
    if (hiloMultiplier >= 50) {
        setTimeout(() => createConfetti(), 300);
        setTimeout(() => createConfetti(), 600);
    }
    
    createParticles('+$' + profit.toFixed(2), '#00e701');
    setTimeout(() => createParticles('🎉 ' + hiloMultiplier.toFixed(2) + 'x', '#ffa502'), 200);
    
    document.getElementById('hilo-result').textContent = '✅ Cashed Out! Won $' + winAmount.toFixed(2) + ' (' + hiloMultiplier.toFixed(2) + 'x)';
    document.getElementById('hilo-result').style.color = '#00e701';
    showToast('Won $' + profit.toFixed(2), 'success');
    
    // Card celebration animation
    const cardElement = document.getElementById('hilo-current-card');
    cardElement.classList.add('win');
    setTimeout(() => cardElement.classList.remove('win'), 800);
    
    setTimeout(() => resetHilo(), 2000);
}

function resetHilo() {
    hiloActive = false;
    hiloBetAmount = 0;
    hiloCards = 0;
    hiloMultiplier = 1.00;
    hiloCurrentCard = null;
    
    document.getElementById('hilo-current-card').querySelector('.card-value').textContent = '?';
    document.getElementById('hilo-start-btn').style.display = 'block';
    document.getElementById('hilo-cashout-btn').style.display = 'none';
    document.getElementById('hilo-buttons').style.display = 'none';
    document.getElementById('hilo-result').textContent = '';
    
    updateHiloDisplay();
}

function updateHiloDisplay() {
    document.getElementById('hilo-cards').textContent = hiloCards;
    document.getElementById('hilo-multiplier').textContent = hiloMultiplier.toFixed(2) + 'x';
    document.getElementById('hilo-potential').textContent = (hiloBetAmount * hiloMultiplier).toFixed(2);
}

// ===== TAROT GAME =====
const tarotMajorArcana = [
    { name: 'The Fool', multiplier: [0, 2, 5, 10] },
    { name: 'The Magician', multiplier: [0, 3, 8, 15] },
    { name: 'The High Priestess', multiplier: [0, 2, 6, 12] },
    { name: 'The Empress', multiplier: [0, 4, 10, 20] },
    { name: 'The Emperor', multiplier: [0, 3, 7, 14] },
    { name: 'The Hierophant', multiplier: [0, 2, 5, 10] },
    { name: 'The Lovers', multiplier: [0, 5, 12, 25] },
    { name: 'The Chariot', multiplier: [0, 4, 9, 18] },
    { name: 'Strength', multiplier: [0, 3, 8, 16] },
    { name: 'The Hermit', multiplier: [0, 2, 6, 12] },
    { name: 'Wheel of Fortune', multiplier: [0, 10, 50, 100] },
    { name: 'Justice', multiplier: [0, 3, 7, 14] },
    { name: 'The Hanged Man', multiplier: [0, 2, 5, 10] },
    { name: 'Death', multiplier: [0, 5, 15, 30] },
    { name: 'Temperance', multiplier: [0, 3, 8, 16] },
    { name: 'The Devil', multiplier: [0, 4, 10, 20] },
    { name: 'The Tower', multiplier: [0, 2, 6, 12] },
    { name: 'The Star', multiplier: [0, 6, 20, 50] },
    { name: 'The Moon', multiplier: [0, 4, 12, 25] },
    { name: 'The Sun', multiplier: [0, 8, 30, 100] },
    { name: 'Judgement', multiplier: [0, 5, 15, 35] },
    { name: 'The World', multiplier: [0, 10, 100, 500] }
];

function playTarot() {
    const betAmount = parseFloat(document.getElementById('tarot-bet').value);
    const riskLevel = document.getElementById('tarot-risk').value;
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('tarot', betAmount);
    updateBalance();
    
    document.getElementById('tarot-play-btn').disabled = true;
    playSound('buttonClick');
    
    // Select random major arcana card
    const majorCard = tarotMajorArcana[Math.floor(Math.random() * tarotMajorArcana.length)];
    const riskIndex = { easy: 0, medium: 1, hard: 2, expert: 3 }[riskLevel];
    let baseMultiplier = majorCard.multiplier[riskIndex];
    
    // Reveal center card first
    setTimeout(() => {
        document.getElementById('tarot-card-2').innerHTML = '<div class="card-value">' + majorCard.name + '<br>' + baseMultiplier + 'x</div>';
        document.getElementById('tarot-card-2').classList.add('revealed');
        playSound('ding');
    }, 500);
    
    // Reveal left card (can increase, decrease, or zero the multiplier)
    setTimeout(() => {
        const leftEffect = Math.random();
        let leftText = '';
        if (leftEffect < 0.4) {
            baseMultiplier *= 1.5;
            leftText = '+50%';
        } else if (leftEffect < 0.7) {
            baseMultiplier *= 0.5;
            leftText = '-50%';
        } else if (leftEffect < 0.85) {
            baseMultiplier *= 2;
            leftText = '×2';
        } else {
            baseMultiplier = 0;
            leftText = '💀 BUST';
        }
        
        document.getElementById('tarot-card-1').innerHTML = '<div class="card-value">' + leftText + '</div>';
        document.getElementById('tarot-card-1').classList.add('revealed');
        playSound('ding');
    }, 1500);
    
    // Reveal right card
    setTimeout(() => {
        const rightEffect = Math.random();
        let rightText = '';
        if (rightEffect < 0.4 && baseMultiplier > 0) {
            baseMultiplier *= 1.5;
            rightText = '+50%';
        } else if (rightEffect < 0.7) {
            baseMultiplier *= 0.5;
            rightText = '-50%';
        } else if (rightEffect < 0.85 && baseMultiplier > 0) {
            baseMultiplier *= 2;
            rightText = '×2';
        } else if (baseMultiplier > 0) {
            baseMultiplier = 0;
            rightText = '💀 BUST';
        } else {
            rightText = '💀';
        }
        
        document.getElementById('tarot-card-3').innerHTML = '<div class="card-value">' + rightText + '</div>';
        document.getElementById('tarot-card-3').classList.add('revealed');
        playSound('ding');
        
        // Calculate result
        setTimeout(() => {
            const winAmount = betAmount * baseMultiplier;
            
            if (winAmount > 0) {
                balance += winAmount;
                trackResult('tarot', betAmount, winAmount);
                updateBalance();
                
                playWinSound(winAmount - betAmount);
                createParticles('+$' + (winAmount - betAmount).toFixed(2), '#00e701');
                if (baseMultiplier >= 50) createConfetti();
                document.getElementById('tarot-result').textContent = '🔮 Won $' + winAmount.toFixed(2) + ' (' + baseMultiplier.toFixed(2) + 'x)';
                document.getElementById('tarot-result').style.color = '#00e701';
                showToast('Won $' + (winAmount - betAmount).toFixed(2), 'success');
            } else {
                trackResult('tarot', betAmount, 0);
                playSound('lose');
                createParticles('-$' + betAmount.toFixed(2), '#ff4757');
                document.getElementById('tarot-result').textContent = '💀 BUST! Lost $' + betAmount.toFixed(2);
                document.getElementById('tarot-result').style.color = '#ff4757';
                showToast('Lost $' + betAmount.toFixed(2), 'error');
            }
            
            // Reset after delay
            setTimeout(() => {
                document.querySelectorAll('.tarot-card').forEach(card => {
                    card.classList.remove('revealed');
                    card.innerHTML = '<div class="card-back">' + (card.classList.contains('major') ? '✨' : '🔮') + '</div>';
                });
                document.getElementById('tarot-result').textContent = '';
                document.getElementById('tarot-play-btn').disabled = false;
            }, 3000);
        }, 500);
    }, 2500);
}

// ===== SNAKES GAME =====
let snakesBoard = [];

function initSnakesBoard(withAnimation = false) {
    const risk = document.getElementById('snakes-risk').value;
    const board = document.getElementById('snakes-board');
    board.innerHTML = '';
    snakesBoard = [];

    // Generate 12 tiles with multipliers and snakes
    const snakeChance = { easy: 0.25, medium: 0.35, hard: 0.45 }[risk];

    for (let i = 1; i <= 12; i++) {
        const isSnake = Math.random() < snakeChance;
        const multiplier = isSnake ? 0 : (Math.random() * 3 + 0.5).toFixed(2);

        snakesBoard.push({ position: i, isSnake, multiplier: parseFloat(multiplier) });

        const tile = document.createElement('div');
        tile.className = 'snakes-tile';
        if (withAnimation) {
            tile.classList.add('spawn');
        }
        tile.innerHTML = '<div class="tile-number">' + i + '</div><div class="tile-icon">?</div>';
        tile.id = 'snake-tile-' + i;
        board.appendChild(tile);
    }
}

function playSnakes() {
    const betAmount = parseFloat(document.getElementById('snakes-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    trackBet('snakes', betAmount);
    updateBalance();
    
    document.getElementById('snakes-play-btn').disabled = true;
    
    // Initialize board
    initSnakesBoard();
    
    // Roll two dice
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const roll = die1 + die2;
    
    // Animate dice
    const die1Element = document.getElementById('die-1');
    const die2Element = document.getElementById('die-2');
    
    die1Element.textContent = '?';
    die2Element.textContent = '?';
    die1Element.classList.add('rolling');
    die2Element.classList.add('rolling');
    
    playSound('buttonClick');
    
    setTimeout(() => {
        die1Element.textContent = die1;
        die2Element.textContent = die2;
        die1Element.classList.remove('rolling');
        die2Element.classList.remove('rolling');
        playSound('ding');
        
        // Reveal tile
        setTimeout(() => {
            const position = Math.min(roll, 12);
            const tile = snakesBoard[position - 1];
            const tileElement = document.getElementById('snake-tile-' + position);
            
            tileElement.classList.add('current');
            
            if (tile.isSnake) {
                tileElement.classList.add('snake');
                tileElement.querySelector('.tile-icon').textContent = '🐍';
                
                trackResult('snakes', betAmount, 0);
                playSound('lose');
                createParticles('-$' + betAmount.toFixed(2), '#ff4757');
                
                document.getElementById('snakes-result').textContent = '🐍 Snake! Lost $' + betAmount.toFixed(2);
                document.getElementById('snakes-result').style.color = '#ff4757';
                document.getElementById('snakes-multiplier').textContent = '0.00x';
                showToast('Hit a snake!', 'error');
            } else {
                tileElement.classList.add('ladder');
                tileElement.querySelector('.tile-icon').textContent = tile.multiplier + 'x';
                
                const winAmount = betAmount * tile.multiplier;
                balance += winAmount;
                trackResult('snakes', betAmount, winAmount);
                updateBalance();
                
                playWinSound(winAmount - betAmount);
                createParticles('+$' + (winAmount - betAmount).toFixed(2), '#00e701');
                if (tile.multiplier >= 3) createConfetti();
                
                document.getElementById('snakes-result').textContent = '🪜 Safe! Won $' + winAmount.toFixed(2) + ' (' + tile.multiplier + 'x)';
                document.getElementById('snakes-result').style.color = '#00e701';
                document.getElementById('snakes-multiplier').textContent = tile.multiplier + 'x';
                showToast('Won $' + (winAmount - betAmount).toFixed(2), 'success');
            }
            
            document.getElementById('snakes-position').textContent = position;
            
            // Reset after delay
            setTimeout(() => {
                document.getElementById('snakes-play-btn').disabled = false;
                document.getElementById('snakes-result').textContent = '';
                document.getElementById('snakes-position').textContent = '0';
                document.getElementById('snakes-multiplier').textContent = '0.00x';
                initSnakesBoard(true); // With animation on reset
            }, 3000);
        }, 1000);
    }, 800);
}


// ===== BLACKJACK GAME =====
let blackjackDeck = [];
let blackjackPlayerHands = [[]]; // Array of hands for split support
let blackjackDealerHand = [];
let blackjackBetAmount = 0;
let blackjackGameActive = false;
let blackjackCanDouble = false;
let blackjackCanSplit = false;
let blackjackCurrentHandIndex = 0;
let blackjackSplitBets = []; // Track bet for each hand

const blackjackCardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const blackjackSuits = ['♠', '♥', '♦', '♣'];
const blackjackRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createBlackjackDeck() {
    const deck = [];
    for (let suit of blackjackSuits) {
        for (let rank of blackjackRanks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

function shuffleBlackjackDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawBlackjackCard() {
    if (blackjackDeck.length === 0) {
        blackjackDeck = shuffleBlackjackDeck(createBlackjackDeck());
    }
    return blackjackDeck.pop();
}

function calculateBlackjackHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    for (let card of hand) {
        value += blackjackCardValues[card.rank];
        if (card.rank === 'A') aces++;
    }
    
    // Adjust for aces
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    
    return value;
}

function canSplitHand(hand) {
    if (hand.length !== 2) return false;
    // Can split if both cards have value 10 (10, J, Q, K)
    return blackjackCardValues[hand[0].rank] === 10 && blackjackCardValues[hand[1].rank] === 10;
}

function renderBlackjackCard(card, hidden = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'blackjack-card';

    if (hidden) {
        cardDiv.classList.add('hidden');
        cardDiv.innerHTML = '🂠';
    } else {
        const isRed = card.suit === '♥' || card.suit === '♦';
        cardDiv.classList.add(isRed ? 'red' : 'black');
        cardDiv.innerHTML = `
            <div class="card-value-top">${card.rank}<br><span class="card-suit">${card.suit}</span></div>
            <div class="card-suit" style="font-size: 24px;">${card.suit}</div>
            <div class="card-value-bottom">${card.rank}<br><span class="card-suit">${card.suit}</span></div>
        `;
    }

    return cardDiv;
}

function updateBlackjackDisplay() {
    const dealerCardsEl = document.getElementById('dealer-cards');
    const handsContainer = document.getElementById('blackjack-hands-container');

    // Clear existing cards
    dealerCardsEl.innerHTML = '';
    handsContainer.innerHTML = '';

    // Render dealer cards (hide second card if game is active)
    blackjackDealerHand.forEach((card, index) => {
        const cardEl = renderBlackjackCard(card, blackjackGameActive && index === 1);
        dealerCardsEl.appendChild(cardEl);
    });

    // Render player hands (support for split)
    blackjackPlayerHands.forEach((hand, handIndex) => {
        const handDiv = document.createElement('div');
        handDiv.className = 'blackjack-hand';
        if (blackjackGameActive && handIndex === blackjackCurrentHandIndex) {
            handDiv.classList.add('active');
        }

        const cardsDiv = document.createElement('div');
        cardsDiv.className = 'blackjack-cards';

        hand.forEach(card => {
            const cardEl = renderBlackjackCard(card);
            cardsDiv.appendChild(cardEl);
        });

        const totalDiv = document.createElement('div');
        totalDiv.className = 'blackjack-total';
        const handValue = calculateBlackjackHandValue(hand);
        totalDiv.textContent = handValue;

        if (handValue === 21 && hand.length === 2 && blackjackPlayerHands.length === 1) {
            totalDiv.classList.add('blackjack');
        }
        if (handValue > 21) {
            totalDiv.classList.add('bust');
        }

        handDiv.appendChild(cardsDiv);
        handDiv.appendChild(totalDiv);
        handsContainer.appendChild(handDiv);
    });

    // Update dealer total
    const dealerValue = blackjackGameActive ?
        blackjackCardValues[blackjackDealerHand[0].rank] :
        calculateBlackjackHandValue(blackjackDealerHand);

    const dealerTotalEl = document.getElementById('dealer-total');
    dealerTotalEl.textContent = dealerValue;
    dealerTotalEl.className = 'blackjack-total';
}

function dealBlackjack() {
    const betAmount = parseFloat(document.getElementById('blackjack-bet').value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }
    
    balance -= betAmount;
    blackjackBetAmount = betAmount;
    trackBet('blackjack', betAmount);
    updateBalance();
    
    // Initialize game
    blackjackDeck = shuffleBlackjackDeck(createBlackjackDeck());
    blackjackPlayerHands = [[drawBlackjackCard(), drawBlackjackCard()]];
    blackjackDealerHand = [drawBlackjackCard(), drawBlackjackCard()];
    blackjackGameActive = true;
    blackjackCanDouble = true;
    blackjackCurrentHandIndex = 0;
    blackjackSplitBets = [];
    
    document.getElementById('blackjack-result').textContent = '';
    document.getElementById('blackjack-deal-btn').style.display = 'none';
    document.getElementById('blackjack-hit-btn').style.display = 'inline-block';
    document.getElementById('blackjack-stand-btn').style.display = 'inline-block';
    document.getElementById('blackjack-double-btn').style.display = 'inline-block';
    document.getElementById('blackjack-split-btn').style.display = 'none';
    
    updateBlackjackDisplay();
    playSound('buttonClick');
    
    // Check for split option
    if (canSplitHand(blackjackPlayerHands[0])) {
        document.getElementById('blackjack-split-btn').style.display = 'inline-block';
    }
    
    // Check for blackjack
    const playerValue = calculateBlackjackHandValue(blackjackPlayerHands[0]);
    if (playerValue === 21) {
        setTimeout(() => endBlackjackGame(), 500);
    }
}

function hitBlackjack() {
    if (!blackjackGameActive) return;
    
    const currentHand = blackjackPlayerHands[blackjackCurrentHandIndex];
    currentHand.push(drawBlackjackCard());
    blackjackCanDouble = false;
    document.getElementById('blackjack-double-btn').style.display = 'none';
    document.getElementById('blackjack-split-btn').style.display = 'none';
    
    updateBlackjackDisplay();
    playSound('ding');
    
    const playerValue = calculateBlackjackHandValue(currentHand);
    if (playerValue >= 21) {
        // If split and more hands to play, move to next hand
        if (blackjackPlayerHands.length > 1 && blackjackCurrentHandIndex < blackjackPlayerHands.length - 1) {
            blackjackCurrentHandIndex++;
            blackjackCanDouble = true;
            document.getElementById('blackjack-double-btn').style.display = 'inline-block';
            updateBlackjackDisplay();
        } else {
            setTimeout(() => endBlackjackGame(), 500);
        }
    }
}

function standBlackjack() {
    if (!blackjackGameActive) return;
    
    // If split and more hands to play, move to next hand
    if (blackjackPlayerHands.length > 1 && blackjackCurrentHandIndex < blackjackPlayerHands.length - 1) {
        blackjackCurrentHandIndex++;
        blackjackCanDouble = blackjackPlayerHands[blackjackCurrentHandIndex].length === 2;
        document.getElementById('blackjack-double-btn').style.display = blackjackCanDouble ? 'inline-block' : 'none';
        document.getElementById('blackjack-split-btn').style.display = 'none';
        updateBlackjackDisplay();
    } else {
        endBlackjackGame();
    }
}

function doubleBlackjack() {
    if (!blackjackGameActive || !blackjackCanDouble) return;

    const doubleBet = blackjackSplitBets.length > 0 ? blackjackSplitBets[blackjackCurrentHandIndex] : blackjackBetAmount;
    if (balance < doubleBet) {
        showToast('Not enough balance to double down', 'error');
        return;
    }

    balance -= doubleBet;
    trackBet('blackjack', doubleBet);
    
    if (blackjackSplitBets.length > 0) {
        blackjackSplitBets[blackjackCurrentHandIndex] *= 2;
    } else {
        blackjackBetAmount *= 2;
    }
    
    updateBalance();

    blackjackPlayerHands[blackjackCurrentHandIndex].push(drawBlackjackCard());
    updateBlackjackDisplay();
    playSound('ding');

    setTimeout(() => {
        if (blackjackCurrentHandIndex < blackjackPlayerHands.length - 1) {
            blackjackCurrentHandIndex++;
            blackjackCanDouble = blackjackPlayerHands[blackjackCurrentHandIndex].length === 2;
            document.getElementById('blackjack-double-btn').style.display = blackjackCanDouble ? 'inline-block' : 'none';
            document.getElementById('blackjack-split-btn').style.display = 'none';
            updateBlackjackDisplay();
        } else {
            endBlackjackGame();
        }
    }, 500);
}

function splitBlackjack() {
    if (!blackjackGameActive || !canSplitHand(blackjackPlayerHands[0])) return;
    
    if (balance < blackjackBetAmount) {
        showToast('Not enough balance to split', 'error');
        return;
    }
    
    balance -= blackjackBetAmount;
    trackBet('blackjack', blackjackBetAmount);
    updateBalance();
    
    // Split the hand
    const firstHand = [blackjackPlayerHands[0][0], drawBlackjackCard()];
    const secondHand = [blackjackPlayerHands[0][1], drawBlackjackCard()];
    
    blackjackPlayerHands = [firstHand, secondHand];
    blackjackSplitBets = [blackjackBetAmount, blackjackBetAmount];
    blackjackCurrentHandIndex = 0;
    blackjackCanDouble = true;
    
    document.getElementById('blackjack-split-btn').style.display = 'none';
    
    updateBlackjackDisplay();
    playSound('ding');
    
    // Check if first hand is 21
    const firstValue = calculateBlackjackHandValue(firstHand);
    if (firstValue === 21) {
        setTimeout(() => {
            blackjackCurrentHandIndex = 1;
            blackjackCanDouble = true;
            updateBlackjackDisplay();
        }, 500);
    }
}

function endBlackjackGame() {
    blackjackGameActive = false;

    // Dealer draws until 17 or higher
    let dealerValue = calculateBlackjackHandValue(blackjackDealerHand);
    while (dealerValue < 17) {
        blackjackDealerHand.push(drawBlackjackCard());
        dealerValue = calculateBlackjackHandValue(blackjackDealerHand);
    }

    updateBlackjackDisplay();

    const isDealerBlackjack = dealerValue === 21 && blackjackDealerHand.length === 2;
    const isDealerBust = dealerValue > 21;

    let totalWinAmount = 0;
    let totalBetAmount = blackjackSplitBets.length > 0 ? blackjackSplitBets.reduce((a, b) => a + b, 0) : blackjackBetAmount;
    let results = [];

    // Evaluate each hand
    blackjackPlayerHands.forEach((hand, index) => {
        const playerValue = calculateBlackjackHandValue(hand);
        const isPlayerBlackjack = playerValue === 21 && hand.length === 2 && blackjackPlayerHands.length === 1;
        const betAmount = blackjackSplitBets.length > 0 ? blackjackSplitBets[index] : blackjackBetAmount;
        let winAmount = 0;
        let handResult = '';

        if (playerValue > 21) {
            handResult = 'BUST';
        } else if (isDealerBust) {
            winAmount = betAmount * 2;
            handResult = 'WIN (Dealer Bust)';
        } else if (isPlayerBlackjack && !isDealerBlackjack) {
            winAmount = betAmount * 2.5;
            handResult = 'BLACKJACK!';
        } else if (playerValue > dealerValue) {
            winAmount = betAmount * 2;
            handResult = 'WIN';
        } else if (playerValue === dealerValue) {
            winAmount = betAmount;
            handResult = 'PUSH';
        } else {
            handResult = 'LOSE';
        }

        totalWinAmount += winAmount;
        results.push(handResult);
    });

    balance += totalWinAmount;
    const profit = totalWinAmount - totalBetAmount;

    trackResult('blackjack', totalBetAmount, totalWinAmount);
    updateBalance();

    // Display result
    let resultText = '';
    if (blackjackPlayerHands.length > 1) {
        resultText = results.map((r, i) => `Hand ${i + 1}: ${r}`).join(' | ');
        resultText += ` | Total: ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`;
    } else {
        resultText = results[0] + ` ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`;
    }

    document.getElementById('blackjack-result').textContent = resultText;
    document.getElementById('blackjack-result').style.color = profit > 0 ? '#00e701' : profit === 0 ? '#ffa502' : '#ff4757';

    // Sound and particles
    if (profit > 0) {
        playWinSound(profit);
        createParticles('+$' + profit.toFixed(2), '#00e701');
        if (results.includes('BLACKJACK!')) createConfetti();
    } else if (profit < 0) {
        playSound('lose');
        createParticles('-$' + Math.abs(profit).toFixed(2), '#ff4757');
    } else {
        playSound('buttonClick');
    }

    document.getElementById('blackjack-hit-btn').style.display = 'none';
    document.getElementById('blackjack-stand-btn').style.display = 'none';
    document.getElementById('blackjack-double-btn').style.display = 'none';
    document.getElementById('blackjack-split-btn').style.display = 'none';

    setTimeout(() => {
        document.getElementById('blackjack-deal-btn').style.display = 'block';
    }, 2000);

    showToast(resultText, profit > 0 ? 'success' : 'error');
}

// ===== BACCARAT GAME =====
let baccaratBet = null;

function selectBaccaratBet(bet) {
    const betAmount = parseFloat(document.getElementById('baccarat-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    baccaratBet = bet;
    balance -= betAmount;
    trackBet('baccarat', betAmount);
    updateBalance();

    // Clear previous cards
    document.getElementById('baccarat-player-cards').innerHTML = '';
    document.getElementById('baccarat-banker-cards').innerHTML = '';
    document.getElementById('baccarat-player-total').textContent = '0';
    document.getElementById('baccarat-banker-total').textContent = '0';
    document.getElementById('baccarat-result').textContent = '';

    playSound('buttonClick');

    // Deal initial cards
    setTimeout(() => {
        const playerCards = [getRandomCard(), getRandomCard()];
        const bankerCards = [getRandomCard(), getRandomCard()];

        let playerTotal = (playerCards[0].value + playerCards[1].value) % 10;
        let bankerTotal = (bankerCards[0].value + bankerCards[1].value) % 10;

        // Display initial player cards
        playerCards.forEach((card, i) => {
            setTimeout(() => {
                displayBaccaratCard(card, 'baccarat-player-cards');
                playSound('blackjackCardFlip');
            }, i * 300);
        });

        // Display initial banker cards
        bankerCards.forEach((card, i) => {
            setTimeout(() => {
                displayBaccaratCard(card, 'baccarat-banker-cards');
                playSound('blackjackCardFlip');
            }, i * 300 + 150);
        });

        setTimeout(() => {
            document.getElementById('baccarat-player-total').textContent = playerTotal;
            document.getElementById('baccarat-banker-total').textContent = bankerTotal;

            // Check for natural win (8 or 9)
            if (playerTotal >= 8 || bankerTotal >= 8) {
                finishBaccarat(playerCards, bankerCards, playerTotal, bankerTotal, betAmount);
                return;
            }

            // Player third card rules
            let playerThirdCard = null;
            if (playerTotal <= 5) {
                playerThirdCard = getRandomCard();
                playerCards.push(playerThirdCard);

                setTimeout(() => {
                    displayBaccaratCard(playerThirdCard, 'baccarat-player-cards');
                    playSound('blackjackCardFlip');
                    playerTotal = playerCards.reduce((sum, c) => sum + c.value, 0) % 10;
                    document.getElementById('baccarat-player-total').textContent = playerTotal;

                    // Banker third card rules (based on player's third card)
                    setTimeout(() => {
                        let bankerDraws = false;
                        const playerThirdValue = playerThirdCard ? playerThirdCard.value : null;

                        if (bankerTotal <= 2) {
                            bankerDraws = true;
                        } else if (bankerTotal === 3 && playerThirdValue !== 8) {
                            bankerDraws = true;
                        } else if (bankerTotal === 4 && playerThirdValue >= 2 && playerThirdValue <= 7) {
                            bankerDraws = true;
                        } else if (bankerTotal === 5 && playerThirdValue >= 4 && playerThirdValue <= 7) {
                            bankerDraws = true;
                        } else if (bankerTotal === 6 && (playerThirdValue === 6 || playerThirdValue === 7)) {
                            bankerDraws = true;
                        }

                        if (bankerDraws) {
                            const bankerThirdCard = getRandomCard();
                            bankerCards.push(bankerThirdCard);
                            displayBaccaratCard(bankerThirdCard, 'baccarat-banker-cards');
                            playSound('blackjackCardFlip');
                            bankerTotal = bankerCards.reduce((sum, c) => sum + c.value, 0) % 10;
                            document.getElementById('baccarat-banker-total').textContent = bankerTotal;
                        }

                        setTimeout(() => {
                            finishBaccarat(playerCards, bankerCards, playerTotal, bankerTotal, betAmount);
                        }, 500);
                    }, 500);
                }, 500);
            } else {
                // Player stands, check banker rules
                setTimeout(() => {
                    if (bankerTotal <= 5) {
                        const bankerThirdCard = getRandomCard();
                        bankerCards.push(bankerThirdCard);
                        displayBaccaratCard(bankerThirdCard, 'baccarat-banker-cards');
                        playSound('blackjackCardFlip');
                        bankerTotal = bankerCards.reduce((sum, c) => sum + c.value, 0) % 10;
                        document.getElementById('baccarat-banker-total').textContent = bankerTotal;

                        setTimeout(() => {
                            finishBaccarat(playerCards, bankerCards, playerTotal, bankerTotal, betAmount);
                        }, 500);
                    } else {
                        finishBaccarat(playerCards, bankerCards, playerTotal, bankerTotal, betAmount);
                    }
                }, 500);
            }
        }, 800);
    }, 300);
}

function displayBaccaratCard(card, containerId) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'baccarat-card';
    cardDiv.textContent = card.display;
    cardDiv.style.color = (card.suit === '♥' || card.suit === '♦') ? '#ff4757' : '#2c3e50';
    document.getElementById(containerId).appendChild(cardDiv);
}

function finishBaccarat(playerCards, bankerCards, playerTotal, bankerTotal, betAmount) {
    // Determine winner
    let winner;
    if (playerTotal > bankerTotal) {
        winner = 'player';
    } else if (bankerTotal > playerTotal) {
        winner = 'banker';
    } else {
        winner = 'tie';
    }

    // Calculate payout
    let winAmount = 0;
    let multiplier = 0;
    const resultDisplay = document.getElementById('baccarat-result');

    if (baccaratBet === winner) {
        if (winner === 'player') {
            multiplier = 2;
            winAmount = betAmount * 2;
        } else if (winner === 'banker') {
            multiplier = 1.95;
            winAmount = betAmount * 1.95;
        } else if (winner === 'tie') {
            multiplier = 9;
            winAmount = betAmount * 9;
        }

        balance += winAmount;
        trackResult('baccarat', betAmount, winAmount);
        playWinSound(winAmount - betAmount);
        createParticles(`+$${(winAmount - betAmount).toFixed(2)}`, '#00e701');
        if (multiplier >= 5) createConfetti();

        resultDisplay.textContent = `${winner.toUpperCase()} WINS! +$${(winAmount - betAmount).toFixed(2)} (${multiplier}x)`;
        resultDisplay.style.color = '#00e701';
        showToast(`Won $${(winAmount - betAmount).toFixed(2)}`, 'success');
    } else {
        trackResult('baccarat', betAmount, 0);
        playSound('lose');
        createParticles(`-$${betAmount.toFixed(2)}`, '#ff4757');

        resultDisplay.textContent = `${winner.toUpperCase()} WINS! Lost $${betAmount.toFixed(2)}`;
        resultDisplay.style.color = '#ff4757';
        showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
    }

    updateBalance();
}

function getRandomCard() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    
    let value;
    if (rank === 'A') value = 1;
    else if (['10', 'J', 'Q', 'K'].includes(rank)) value = 0; // 10 and face cards worth 0 in Baccarat
    else value = parseInt(rank);

    return { suit, rank, value, display: rank + suit };
}

// ===== VIDEO POKER GAME =====
let pokerHand = [];
let heldCards = [];

function dealVideoPoker() {
    const betAmount = parseFloat(document.getElementById('videopoker-bet').value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error');
        return;
    }

    balance -= betAmount;
    trackBet('videopoker', betAmount);
    updateBalance();

    // Deal 5 cards
    pokerHand = [];
    heldCards = [];
    for (let i = 0; i < 5; i++) {
        pokerHand.push(getPokerCard());
    }

    displayPokerHand();
    document.getElementById('poker-result').textContent = '';
    document.getElementById('videopoker-deal-btn').style.display = 'none';
    document.getElementById('videopoker-draw-btn').style.display = 'block';

    playSound('buttonClick');
}

function drawVideoPoker() {
    const betAmount = parseFloat(document.getElementById('videopoker-bet').value);

    // Replace non-held cards
    for (let i = 0; i < 5; i++) {
        if (!heldCards.includes(i)) {
            pokerHand[i] = getPokerCard();
        }
    }

    displayPokerHand();
    document.getElementById('videopoker-draw-btn').style.display = 'none';
    document.getElementById('videopoker-deal-btn').style.display = 'block';

    playSound('blackjackCardFlip');

    // Evaluate hand
    setTimeout(() => {
        const handResult = evaluatePokerHand(pokerHand);
        const resultDisplay = document.getElementById('poker-result');

        if (handResult.multiplier > 0) {
            const winAmount = betAmount * handResult.multiplier;
            balance += winAmount; // Add full payout (bet was already deducted)
            trackResult('videopoker', betAmount, winAmount);
            const profit = winAmount - betAmount;
            playWinSound(profit);
            createParticles('+$' + profit.toFixed(2), '#00e701');
            if (handResult.multiplier >= 50) createConfetti();

            resultDisplay.textContent = `${handResult.name}! Won $${profit.toFixed(2)} (${handResult.multiplier}x)`;
            resultDisplay.style.color = '#00e701';
            showToast(`${handResult.name}! +$${profit.toFixed(2)}`, 'success');
        } else {
            trackResult('videopoker', betAmount, 0);
            playSound('lose');
            createParticles('-$' + betAmount.toFixed(2), '#ff4757');

            resultDisplay.textContent = `No Win - Lost $${betAmount.toFixed(2)}`;
            resultDisplay.style.color = '#ff4757';
            showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
        }

        updateBalance();
    }, 500);
}

function getPokerCard() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    
    let value = ranks.indexOf(rank) + 2;

    return { suit, rank, value, display: rank };
}

function displayPokerHand() {
    const container = document.getElementById('poker-cards');
    container.innerHTML = '';

    pokerHand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'poker-card';
        if (heldCards.includes(index)) cardDiv.classList.add('held');
        
        cardDiv.innerHTML = `
            <div>${card.display}</div>
            <div class="poker-card-suit">${card.suit}</div>
        `;
        cardDiv.style.color = (card.suit === '♥' || card.suit === '♦') ? '#ff4757' : '#2c3e50';
        
        cardDiv.onclick = () => toggleHold(index);
        container.appendChild(cardDiv);
    });
}

function toggleHold(index) {
    if (document.getElementById('videopoker-draw-btn').style.display === 'none') return;

    const cardIndex = heldCards.indexOf(index);
    if (cardIndex > -1) {
        heldCards.splice(cardIndex, 1);
    } else {
        heldCards.push(index);
    }
    displayPokerHand();
    playSound('kenoSelect');
}

function evaluatePokerHand(hand) {
    const ranks = hand.map(c => c.value).sort((a, b) => a - b);
    const suits = hand.map(c => c.suit);

    const rankCounts = {};
    ranks.forEach(r => rankCounts[r] = (rankCounts[r] || 0) + 1);
    const counts = Object.values(rankCounts).sort((a, b) => b - a);

    const isFlush = suits.every(s => s === suits[0]);
    const isStraight = ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5;
    const isRoyal = isStraight && ranks[0] === 10;

    if (isRoyal && isFlush) return { name: 'Royal Flush', multiplier: 250 };
    if (isStraight && isFlush) return { name: 'Straight Flush', multiplier: 50 };
    if (counts[0] === 4) return { name: 'Four of a Kind', multiplier: 25 };
    if (counts[0] === 3 && counts[1] === 2) return { name: 'Full House', multiplier: 9 };
    if (isFlush) return { name: 'Flush', multiplier: 6 };
    if (isStraight) return { name: 'Straight', multiplier: 5 }; // Changed from 4 to 5
    if (counts[0] === 3) return { name: 'Three of a Kind', multiplier: 3 }; // Changed from 3 to 3 (was showing 2x)
    
    // Two Pair - check if we have exactly 2 pairs
    if (counts[0] === 2 && counts[1] === 2) {
        return { name: 'Two Pair', multiplier: 4 }; // Changed from 2 to 4
    }

    // Any Pair pays 2x
    if (counts[0] === 2) {
        return { name: 'Pair', multiplier: 2 };
    }

    return { name: 'No Win', multiplier: 0 };
}

// ===== ROCK PAPER SCISSORS GAME =====
let rpsStreak = 0;
let rpsCooldown = false;
let rpsMultiplier = 1.0;
let rpsBaseBet = 0;
let rpsAccumulatedWin = 0;

function playRPS(playerChoice) {
    if (rpsCooldown) { showToast("Please wait...", "error"); return; }
    rpsCooldown = true; setTimeout(() => { rpsCooldown = false; }, 1500);
    const betInput = document.getElementById('rps-bet');
    let betAmount;

    // If in a streak, use the base bet
    if (rpsStreak > 0) {
        betAmount = rpsBaseBet;
        betInput.disabled = true;
    } else {
        betAmount = parseFloat(betInput.value);
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
            showToast('Invalid bet amount', 'error');
            return;
        }
        rpsBaseBet = betAmount;
        balance -= betAmount;
        trackBet('rps', betAmount);
        updateBalance();
    }

    const choices = ['rock', 'paper', 'scissors'];
    const icons = { rock: '✊', paper: '✋', scissors: '✌️' };
    const houseChoice = choices[Math.floor(Math.random() * choices.length)];

    // Display choices
    document.getElementById('player-choice').textContent = icons[playerChoice];
    document.getElementById('house-choice').textContent = '?';
    document.getElementById('rps-result').textContent = '';

    playSound('buttonClick');

    setTimeout(() => {
        document.getElementById('house-choice').textContent = icons[houseChoice];
        playSound('ding');

        setTimeout(() => {
            let result;
            if (playerChoice === houseChoice) {
                result = 'tie';
            } else if (
                (playerChoice === 'rock' && houseChoice === 'scissors') ||
                (playerChoice === 'paper' && houseChoice === 'rock') ||
                (playerChoice === 'scissors' && houseChoice === 'paper')
            ) {
                result = 'win';
            } else {
                result = 'lose';
            }

            const resultDisplay = document.getElementById('rps-result');

            if (result === 'win') {
                rpsStreak++;
                rpsMultiplier = 1.0 + rpsStreak; // 2x, 3x, 4x...
                rpsAccumulatedWin = rpsBaseBet * rpsMultiplier;

                playWinSound(rpsAccumulatedWin);
                createParticles(`Streak ${rpsStreak}!`, '#00e701');

                resultDisplay.textContent = `YOU WIN! Streak: ${rpsStreak} | Multiplier: ${rpsMultiplier.toFixed(2)}x`;
                resultDisplay.style.color = '#00e701';
                showToast(`Win Streak ${rpsStreak}! ${rpsMultiplier.toFixed(2)}x`, 'success');

                // Show cash out button
                document.getElementById('rps-cashout-btn').style.display = 'block';

                // Update streak display
                updateRPSStreakDisplay();

                // Milestone particles
                if (rpsStreak === 5 || rpsStreak === 10 || rpsStreak % 10 === 0) {
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => createParticles('🔥', '#ffc800'), i * 50);
                    }
                }

            } else if (result === 'tie') {
                // Return bet on tie if not in a streak
                if (rpsStreak === 0) {
                    balance += betAmount;
                }
                playSound('buttonClick');
                resultDisplay.textContent = rpsStreak > 0 ? `TIE! Streak continues at ${rpsStreak}` : `TIE! Bet returned`;
                resultDisplay.style.color = '#ffc800';
                showToast(rpsStreak > 0 ? 'Tie - Streak continues' : 'Tie - Bet returned', 'success');

            } else {
                // LOSE - Reset everything
                playSound('lose');
                createParticles(`Lost Streak!`, '#ff4757');

                if (rpsStreak > 0) {
                    resultDisplay.textContent = `YOU LOSE! Lost streak of ${rpsStreak} (-$${rpsBaseBet.toFixed(2)})`;
                    showToast(`Lost streak of ${rpsStreak}!`, 'error');
                } else {
                    resultDisplay.textContent = `YOU LOSE! -$${betAmount.toFixed(2)}`;
                    showToast(`Lost $${betAmount.toFixed(2)}`, 'error');
                }
                resultDisplay.style.color = '#ff4757';

                // Reset streak
                resetRPSStreak();
            }

            updateBalance();
        }, 500);
    }, 800);
}

function cashoutRPS() {
    if (rpsStreak === 0) return;

    balance += rpsAccumulatedWin;
    trackResult('rps', rpsBaseBet, rpsAccumulatedWin);
    
    const profit = rpsAccumulatedWin - rpsBaseBet;
    playWinSound(profit);
    createParticles(`+$${profit.toFixed(2)}`, '#00e701');
    
    showToast(`Cashed out $${rpsAccumulatedWin.toFixed(2)} at ${rpsMultiplier.toFixed(2)}x!`, 'success');
    
    // Confetti for big cashouts
    if (rpsStreak >= 5) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createParticles('💰', '#00e701'), i * 30);
        }
    }

    resetRPSStreak();
    updateBalance();
}

function resetRPSStreak() {
    rpsStreak = 0;
    rpsMultiplier = 1.0;
    rpsBaseBet = 0;
    rpsAccumulatedWin = 0;
    
    document.getElementById('rps-bet').disabled = false;
    document.getElementById('rps-cashout-btn').style.display = 'none';
    
    updateRPSStreakDisplay();
}

function updateRPSStreakDisplay() {
    document.getElementById('rps-streak').textContent = rpsStreak;
    document.getElementById('rps-multiplier').textContent = rpsMultiplier.toFixed(2) + 'x';
    document.getElementById('rps-potential').textContent = '$' + rpsAccumulatedWin.toFixed(2);
}







// ===== TEXAS HOLD'EM GAME =====
let holdemInProgress = false;

function playHoldem() {
    if (holdemInProgress) return;
    
    const betAmount = parseFloat(document.getElementById('holdem-bet').value);
    if (isNaN(betAmount) || betAmount <= 0) {
        showToast('Please enter a valid bet amount', 'error');
        return;
    }
    if (betAmount > balance) {
        showToast('Insufficient balance', 'error');
        return;
    }

    holdemInProgress = true;
    balance -= betAmount;
    updateBalance();
    trackBet('holdem', betAmount);

    // Clear previous game
    document.getElementById('holdem-community').innerHTML = '';
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('bot1-cards').innerHTML = '';
    document.getElementById('bot2-cards').innerHTML = '';
    document.getElementById('bot3-cards').innerHTML = '';
    document.getElementById('holdem-result').innerHTML = '';
    document.getElementById('player-status').textContent = '';
    document.getElementById('bot1-status').textContent = '';
    document.getElementById('bot2-status').textContent = '';
    document.getElementById('bot3-status').textContent = '';

    // Create deck and shuffle
    const deck = createHoldemDeck();
    shuffleDeck(deck);

    // Deal 2 cards to each player
    const playerHand = [deck.pop(), deck.pop()];
    const bot1Hand = [deck.pop(), deck.pop()];
    const bot2Hand = [deck.pop(), deck.pop()];
    const bot3Hand = [deck.pop(), deck.pop()];

    // Deal 5 community cards
    const communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];

    // Show pot
    const pot = betAmount * 4; // All 4 players contribute
    document.getElementById('holdem-pot').textContent = `Pot: $${pot.toFixed(2)}`;

    // Animate dealing
    setTimeout(() => {
        displayHoldemCards('player-cards', playerHand, false);
        displayHoldemCards('bot1-cards', bot1Hand, true);
        displayHoldemCards('bot2-cards', bot2Hand, true);
        displayHoldemCards('bot3-cards', bot3Hand, true);
    }, 300);

    // Show flop (3 cards)
    setTimeout(() => {
        displayHoldemCommunityCards(communityCards.slice(0, 3));
    }, 1000);

    // Show turn (4th card)
    setTimeout(() => {
        displayHoldemCommunityCards(communityCards.slice(0, 4));
    }, 1800);

    // Show river (5th card)
    setTimeout(() => {
        displayHoldemCommunityCards(communityCards);
    }, 2600);

    // Evaluate and show winner
    setTimeout(() => {
        const playerBest = evaluateHoldemHand(playerHand, communityCards);
        const bot1Best = evaluateHoldemHand(bot1Hand, communityCards);
        const bot2Best = evaluateHoldemHand(bot2Hand, communityCards);
        const bot3Best = evaluateHoldemHand(bot3Hand, communityCards);

        // Reveal bot cards
        displayHoldemCards('bot1-cards', bot1Hand, false);
        displayHoldemCards('bot2-cards', bot2Hand, false);
        displayHoldemCards('bot3-cards', bot3Hand, false);

        // Show hand rankings
        document.getElementById('player-status').textContent = playerBest.name;
        document.getElementById('bot1-status').textContent = bot1Best.name;
        document.getElementById('bot2-status').textContent = bot2Best.name;
        document.getElementById('bot3-status').textContent = bot3Best.name;

        // Determine winner
        const hands = [
            { player: 'YOU', hand: playerBest, isPlayer: true },
            { player: 'BOT 1', hand: bot1Best, isPlayer: false },
            { player: 'BOT 2', hand: bot2Best, isPlayer: false },
            { player: 'BOT 3', hand: bot3Best, isPlayer: false }
        ];

        hands.sort((a, b) => {
            if (b.hand.rank !== a.hand.rank) return b.hand.rank - a.hand.rank;
            // If same rank, compare high cards
            for (let i = 0; i < 5; i++) {
                if (b.hand.values[i] !== a.hand.values[i]) {
                    return b.hand.values[i] - a.hand.values[i];
                }
            }
            return 0;
        });

        const winner = hands[0];
        const playerWon = winner.isPlayer;

        let resultHTML = `<div class="holdem-winner">`;
        resultHTML += `<div style="font-size: 24px; margin-bottom: 10px;">${winner.player} WINS!</div>`;
        resultHTML += `<div style="font-size: 18px; color: #00e701;">${winner.hand.name}</div>`;
        resultHTML += `</div>`;

        document.getElementById('holdem-result').innerHTML = resultHTML;

        if (playerWon) {
            balance += pot;
            trackResult('holdem', betAmount, pot);
            const profit = pot - betAmount;
            playWinSound(profit);
            createParticles(`+${profit.toFixed(2)}`, '#00e701');
            showToast(`You won $${pot.toFixed(2)}!`, 'success');
        } else {
            trackResult('holdem', betAmount, 0);
            playSound('loose');
            createParticles(`-${betAmount.toFixed(2)}`, '#ff0000');
            showToast(`${winner.player} won with ${winner.hand.name}`, 'error');
        }

        updateBalance();
        holdemInProgress = false;
    }, 3800);
}

function createHoldemDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    
    for (let suit of suits) {
        for (let i = 0; i < ranks.length; i++) {
            deck.push({
                suit: suit,
                rank: ranks[i],
                value: i + 2 // 2-14 (A=14)
            });
        }
    }
    
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function displayHoldemCards(elementId, cards, faceDown) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'holdem-card';
        
        if (faceDown) {
            cardDiv.innerHTML = '<div class="card-back">🂠</div>';
        } else {
            const color = (card.suit === '♥' || card.suit === '♦') ? '#ff0000' : '#000000';
            cardDiv.innerHTML = `
                <div class="card-rank" style="color: ${color};">${card.rank}</div>
                <div class="card-suit" style="color: ${color};">${card.suit}</div>
            `;
        }
        
        container.appendChild(cardDiv);
    });
}

function displayHoldemCommunityCards(cards) {
    const container = document.getElementById('holdem-community');
    container.innerHTML = '';
    
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'holdem-card community-card';
        const color = (card.suit === '♥' || card.suit === '♦') ? '#ff0000' : '#000000';
        cardDiv.innerHTML = `
            <div class="card-rank" style="color: ${color};">${card.rank}</div>
            <div class="card-suit" style="color: ${color};">${card.suit}</div>
        `;
        container.appendChild(cardDiv);
    });
}

function evaluateHoldemHand(holeCards, communityCards) {
    // Combine hole cards with community cards
    const allCards = [...holeCards, ...communityCards];
    
    // Generate all possible 5-card combinations
    const combinations = [];
    for (let i = 0; i < allCards.length; i++) {
        for (let j = i + 1; j < allCards.length; j++) {
            for (let k = j + 1; k < allCards.length; k++) {
                for (let l = k + 1; l < allCards.length; l++) {
                    for (let m = l + 1; m < allCards.length; m++) {
                        combinations.push([allCards[i], allCards[j], allCards[k], allCards[l], allCards[m]]);
                    }
                }
            }
        }
    }
    
    // Evaluate each combination and find the best
    let bestHand = { rank: 0, name: 'High Card', values: [] };
    
    for (let combo of combinations) {
        const hand = evaluatePokerHandRank(combo);
        if (hand.rank > bestHand.rank || 
            (hand.rank === bestHand.rank && compareHighCards(hand.values, bestHand.values) > 0)) {
            bestHand = hand;
        }
    }
    
    return bestHand;
}

function evaluatePokerHandRank(cards) {
    const values = cards.map(c => c.value).sort((a, b) => b - a);
    const suits = cards.map(c => c.suit);
    
    const valueCounts = {};
    values.forEach(v => valueCounts[v] = (valueCounts[v] || 0) + 1);
    const counts = Object.entries(valueCounts).sort((a, b) => b[1] - a[1] || b[0] - a[0]);
    
    const isFlush = suits.every(s => s === suits[0]);
    const sortedValues = [...values].sort((a, b) => a - b);
    const isStraight = sortedValues[4] - sortedValues[0] === 4 && new Set(sortedValues).size === 5;
    const isLowStraight = sortedValues[0] === 2 && sortedValues[4] === 14; // A-2-3-4-5
    const isRoyal = isStraight && sortedValues[0] === 10;
    
    if (isRoyal && isFlush) return { rank: 10, name: 'Royal Flush', values };
    if (isStraight && isFlush) return { rank: 9, name: 'Straight Flush', values };
    if (counts[0][1] === 4) return { rank: 8, name: 'Four of a Kind', values };
    if (counts[0][1] === 3 && counts[1][1] === 2) return { rank: 7, name: 'Full House', values };
    if (isFlush) return { rank: 6, name: 'Flush', values };
    if (isStraight || isLowStraight) return { rank: 5, name: 'Straight', values };
    if (counts[0][1] === 3) return { rank: 4, name: 'Three of a Kind', values };
    if (counts[0][1] === 2 && counts[1][1] === 2) return { rank: 3, name: 'Two Pair', values };
    if (counts[0][1] === 2) return { rank: 2, name: 'Pair', values };
    return { rank: 1, name: 'High Card', values };
}

function compareHighCards(values1, values2) {
    for (let i = 0; i < Math.min(values1.length, values2.length); i++) {
        if (values1[i] !== values2[i]) {
            return values1[i] - values2[i];
        }
    }
    return 0;
}


// Debug: Verify script loaded
console.log('game.js loaded successfully');
console.log('showGameSelection function exists:', typeof showGameSelection);


// ===== NEW GAME UPGRADES =====

// Pump upgrades
function usePumpSafety() {
    if (upgrades.pumpSafety <= 0) {
        showToast('No Pump Safety available!', 'error');
        return;
    }
    upgrades.pumpSafety--;
    document.getElementById('upgrade-pumpSafety').textContent = upgrades.pumpSafety;
    if (upgrades.pumpSafety === 0) {
        document.getElementById('pump-safety-btn').style.display = 'none';
    }
    showToast('Pump Safety activated! Next pop is protected.', 'success');
    // Add your pump safety logic here
}

function usePumpGreed() {
    if (upgrades.pumpGreed <= 0) {
        showToast('No Greedy Pump available!', 'error');
        return;
    }
    upgrades.pumpGreed--;
    document.getElementById('upgrade-pumpGreed').textContent = upgrades.pumpGreed;
    if (upgrades.pumpGreed === 0) {
        document.getElementById('pump-greed-btn').style.display = 'none';
    }
    showToast('Greedy Pump activated! Higher multipliers.', 'success');
    // Add your pump greed logic here
}

// Drill upgrades
function useDrillLuck() {
    if (upgrades.drillLuck <= 0) {
        showToast('No Lucky Drill available!', 'error');
        return;
    }
    upgrades.drillLuck--;
    document.getElementById('upgrade-drillLuck').textContent = upgrades.drillLuck;
    if (upgrades.drillLuck === 0) {
        document.getElementById('drill-luck-btn').style.display = 'none';
    }
    showToast('Lucky Drill activated! Better path generation.', 'success');
    // Add your drill luck logic here
}

function useDrillVision() {
    if (upgrades.drillVision <= 0) {
        showToast('No Drill Vision available!', 'error');
        return;
    }
    upgrades.drillVision--;
    document.getElementById('upgrade-drillVision').textContent = upgrades.drillVision;
    if (upgrades.drillVision === 0) {
        document.getElementById('drill-vision-btn').style.display = 'none';
    }
    showToast('Drill Vision activated! See next segment hint.', 'success');
    // Add your drill vision logic here
}

// Diamonds upgrades
function useDiamondsMatch() {
    if (upgrades.diamondsMatch <= 0) {
        showToast('No Match Master available!', 'error');
        return;
    }
    upgrades.diamondsMatch--;
    document.getElementById('upgrade-diamondsMatch').textContent = upgrades.diamondsMatch;
    if (upgrades.diamondsMatch === 0) {
        document.getElementById('diamonds-match-btn').style.display = 'none';
    }
    showToast('Match Master activated! Better matching odds.', 'success');
    // Add your diamonds match logic here
}

function useDiamondsRare() {
    if (upgrades.diamondsRare <= 0) {
        showToast('No Rare Gems available!', 'error');
        return;
    }
    upgrades.diamondsRare--;
    document.getElementById('upgrade-diamondsRare').textContent = upgrades.diamondsRare;
    if (upgrades.diamondsRare === 0) {
        document.getElementById('diamonds-rare-btn').style.display = 'none';
    }
    showToast('Rare Gems activated! More valuable symbols.', 'success');
    // Add your diamonds rare logic here
}

// Darts upgrades
function useDartsAim() {
    if (upgrades.dartsAim <= 0) {
        showToast('No Perfect Aim available!', 'error');
        return;
    }
    upgrades.dartsAim--;
    document.getElementById('upgrade-dartsAim').textContent = upgrades.dartsAim;
    if (upgrades.dartsAim === 0) {
        document.getElementById('darts-aim-btn').style.display = 'none';
    }
    showToast('Perfect Aim activated! Better accuracy.', 'success');
    // Add your darts aim logic here
}

function useDartsBullseye() {
    if (upgrades.dartsBullseye <= 0) {
        showToast('No Bullseye Master available!', 'error');
        return;
    }
    upgrades.dartsBullseye--;
    document.getElementById('upgrade-dartsBullseye').textContent = upgrades.dartsBullseye;
    if (upgrades.dartsBullseye === 0) {
        document.getElementById('darts-bullseye-btn').style.display = 'none';
    }
    showToast('Bullseye Master activated! Higher bullseye chance.', 'success');
    // Add your darts bullseye logic here
}

// Chicken upgrades
function useChickenSafety() {
    if (upgrades.chickenSafety <= 0) {
        showToast('No Chicken Shield available!', 'error');
        return;
    }
    upgrades.chickenSafety--;
    document.getElementById('upgrade-chickenSafety').textContent = upgrades.chickenSafety;
    if (upgrades.chickenSafety === 0) {
        document.getElementById('chicken-safety-btn').style.display = 'none';
    }
    chickenSafetyActive = true;
    showToast('Chicken Shield activated! Next hit is protected.', 'success');
}

function useChickenGreed() {
    if (upgrades.chickenGreed <= 0) {
        showToast('No Greedy Chicken available!', 'error');
        return;
    }
    upgrades.chickenGreed--;
    document.getElementById('upgrade-chickenGreed').textContent = upgrades.chickenGreed;
    if (upgrades.chickenGreed === 0) {
        document.getElementById('chicken-greed-btn').style.display = 'none';
    }
    showToast('Greedy Chicken activated! Higher multipliers.', 'success');
    // Add your chicken greed logic here
}

// Hi-Lo upgrades
function useHiloOracle() {
    if (upgrades.hiloOracle <= 0) {
        showToast('No Card Oracle available!', 'error');
        return;
    }
    upgrades.hiloOracle--;
    document.getElementById('upgrade-hiloOracle').textContent = upgrades.hiloOracle;
    if (upgrades.hiloOracle === 0) {
        document.getElementById('hilo-oracle-btn').style.display = 'none';
    }
    showToast('Card Oracle activated! See next card hint.', 'success');
    // Add your hilo oracle logic here
}

function useHiloStreak() {
    if (upgrades.hiloStreak <= 0) {
        showToast('No Streak Master available!', 'error');
        return;
    }
    upgrades.hiloStreak--;
    document.getElementById('upgrade-hiloStreak').textContent = upgrades.hiloStreak;
    if (upgrades.hiloStreak === 0) {
        document.getElementById('hilo-streak-btn').style.display = 'none';
    }
    showToast('Streak Master activated! Better streak multipliers.', 'success');
    // Add your hilo streak logic here
}

// Tarot upgrades
function useTarotFortune() {
    if (upgrades.tarotFortune <= 0) {
        showToast('No Fortune Teller available!', 'error');
        return;
    }
    upgrades.tarotFortune--;
    document.getElementById('upgrade-tarotFortune').textContent = upgrades.tarotFortune;
    if (upgrades.tarotFortune === 0) {
        document.getElementById('tarot-fortune-btn').style.display = 'none';
    }
    showToast('Fortune Teller activated! Better card readings.', 'success');
    // Add your tarot fortune logic here
}

function useTarotVision() {
    if (upgrades.tarotVision <= 0) {
        showToast('No Mystic Vision available!', 'error');
        return;
    }
    upgrades.tarotVision--;
    document.getElementById('upgrade-tarotVision').textContent = upgrades.tarotVision;
    if (upgrades.tarotVision === 0) {
        document.getElementById('tarot-vision-btn').style.display = 'none';
    }
    showToast('Mystic Vision activated! See card hints.', 'success');
    // Add your tarot vision logic here
}

// Snakes upgrades
function useSnakesLadder() {
    if (upgrades.snakesLadder <= 0) {
        showToast('No Ladder Boost available!', 'error');
        return;
    }
    upgrades.snakesLadder--;
    document.getElementById('upgrade-snakesLadder').textContent = upgrades.snakesLadder;
    if (upgrades.snakesLadder === 0) {
        document.getElementById('snakes-ladder-btn').style.display = 'none';
    }
    showToast('Ladder Boost activated! More ladders, fewer snakes.', 'success');
    // Add your snakes ladder logic here
}

function useSnakesLuck() {
    if (upgrades.snakesLuck <= 0) {
        showToast('No Lucky Roll available!', 'error');
        return;
    }
    upgrades.snakesLuck--;
    document.getElementById('upgrade-snakesLuck').textContent = upgrades.snakesLuck;
    if (upgrades.snakesLuck === 0) {
        document.getElementById('snakes-luck-btn').style.display = 'none';
    }
    showToast('Lucky Roll activated! Better dice rolls.', 'success');
    // Add your snakes luck logic here
}

// Cases upgrades
function useCasesLuck() {
    if (upgrades.casesLuck <= 0) {
        showToast('No Lucky Case available!', 'error');
        return;
    }
    upgrades.casesLuck--;
    document.getElementById('upgrade-casesLuck').textContent = upgrades.casesLuck;
    if (upgrades.casesLuck === 0) {
        document.getElementById('cases-luck-btn').style.display = 'none';
    }
    showToast('Lucky Case activated! Better item odds.', 'success');
    // Add your cases luck logic here
}

function useCasesRare() {
    if (upgrades.casesRare <= 0) {
        showToast('No Rare Finder available!', 'error');
        return;
    }
    upgrades.casesRare--;
    document.getElementById('upgrade-casesRare').textContent = upgrades.casesRare;
    if (upgrades.casesRare === 0) {
        document.getElementById('cases-rare-btn').style.display = 'none';
    }
    showToast('Rare Finder activated! Higher chance of rare items.', 'success');
    // Add your cases rare logic here
}

// Scratch upgrades
function useScratchGolden() {
    if (upgrades.scratchGolden <= 0) {
        showToast('No Golden Ticket available!', 'error');
        return;
    }
    upgrades.scratchGolden--;
    document.getElementById('upgrade-scratchGolden').textContent = upgrades.scratchGolden;
    if (upgrades.scratchGolden === 0) {
        document.getElementById('scratch-golden-btn').style.display = 'none';
    }
    showToast('Golden Ticket activated! Better scratch odds.', 'success');
    // Add your scratch golden logic here
}

function useScratchReveal() {
    if (upgrades.scratchReveal <= 0) {
        showToast('No X-Ray Vision available!', 'error');
        return;
    }
    upgrades.scratchReveal--;
    document.getElementById('upgrade-scratchReveal').textContent = upgrades.scratchReveal;
    if (upgrades.scratchReveal === 0) {
        document.getElementById('scratch-reveal-btn').style.display = 'none';
    }
    showToast('X-Ray Vision activated! See one symbol before scratching.', 'success');
    // Add your scratch reveal logic here
}

// Packs upgrades
function usePacksBoost() {
    if (upgrades.packsBoost <= 0) {
        showToast('No Pack Boost available!', 'error');
        return;
    }
    upgrades.packsBoost--;
    document.getElementById('upgrade-packsBoost').textContent = upgrades.packsBoost;
    if (upgrades.packsBoost === 0) {
        document.getElementById('packs-boost-btn').style.display = 'none';
    }
    showToast('Pack Boost activated! Better pack rewards.', 'success');
    // Add your packs boost logic here
}

function usePacksLegendary() {
    if (upgrades.packsLegendary <= 0) {
        showToast('No Legendary Hunter available!', 'error');
        return;
    }
    upgrades.packsLegendary--;
    document.getElementById('upgrade-packsLegendary').textContent = upgrades.packsLegendary;
    if (upgrades.packsLegendary === 0) {
        document.getElementById('packs-legendary-btn').style.display = 'none';
    }
    showToast('Legendary Hunter activated! Higher legendary chance.', 'success');
    // Add your packs legendary logic here
}





// ===== HORSE BETTING GAME =====
const horses = [
    { name: '⚡ Thunder',      color: '#ffc800' },
    { name: '🌟 Starlight',    color: '#627eea' },
    { name: '🔥 Blaze',        color: '#ff4757' },
    { name: '💨 Windrunner',   color: '#00e701' },
    { name: '🌙 Moonshot',     color: '#a29bfe' },
    { name: '🎲 Lucky Hooves', color: '#fd79a8' }
];

const HORSE_ODDS = 2.0;
const HORSE_EVENTS = [
    { name: 'BURST!',   emoji: '💨', duration: 35, mult: 1.8,  color: '#00e701' },
    { name: 'TRIP!',    emoji: '😵', duration: 30, mult: 0.0,  color: '#ff4757' },
    { name: 'STUMBLE!', emoji: '😬', duration: 22, mult: 0.3,  color: '#ffc800' },
    { name: 'TIRED!',   emoji: '😮', duration: 40, mult: 0.5,  color: '#b1bad3' },
    { name: 'SPRINT!',  emoji: '🚀', duration: 28, mult: 1.6,  color: '#00e701' },
];

let selectedHorse = null;
let horseRaceActive = false;
let horseCooldown = false;
let cheerCooldown = false;
let cheerActive = false;
let cheerMult = 1.0;
let cheerTicks = 0;
let horseCanvas = null;
let horseCtx = null;
const LANE_H = 80;
const NAME_W = 160;
const PADDING = 16;

function initHorseGame() {
    // Build horse selection buttons
    const sel = document.getElementById('horse-selection');
    if (sel && sel.children.length === 0) {
        horses.forEach((h, i) => {
            const btn = document.createElement('button');
            btn.className = 'horse-btn';
            btn.innerHTML = '<span>' + h.name + '</span><span style="color:#ffc800">' + HORSE_ODDS + 'x</span>';
            btn.onclick = () => selectHorse(i);
            sel.appendChild(btn);
        });
    }

    // Build canvas
    const container = document.getElementById('race-track');
    if (!container) return;
    container.innerHTML = '';

    horseCanvas = document.createElement('canvas');
    horseCanvas.style.width = '100%';
    horseCanvas.style.borderRadius = '8px';
    horseCanvas.style.display = 'block';
    container.appendChild(horseCanvas);

    // Size canvas after it's in DOM - use devicePixelRatio for crisp rendering
    requestAnimationFrame(() => {
        const dpr = window.devicePixelRatio || 1;
        const w = Math.max(container.offsetWidth, 500);
        const h = horses.length * LANE_H + PADDING * 2;
        horseCanvas.width = w * dpr;
        horseCanvas.height = h * dpr;
        horseCanvas.style.width = w + 'px';
        horseCanvas.style.height = h + 'px';
        horseCtx = horseCanvas.getContext('2d');
        horseCtx.scale(dpr, dpr);
        drawRaceIdle();
    });
}

function drawRaceIdle() {
    if (!horseCtx || !horseCanvas) return;
    const w = parseInt(horseCanvas.style.width) || horseCanvas.width;
    const ctx = horseCtx;
    ctx.clearRect(0, 0, w, parseInt(horseCanvas.style.height) || horseCanvas.height);

    horses.forEach((h, i) => {
        const y = PADDING + i * LANE_H;
        ctx.fillStyle = 'rgba(47,69,83,0.4)';
        roundRect(ctx, 0, y, w, LANE_H - 6, 10);
        ctx.fill();

        ctx.fillStyle = h.color;
        roundRect(ctx, 0, y, 5, LANE_H - 6, 5);
        ctx.fill();

        ctx.fillStyle = h.color;
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(h.name, 14, y + LANE_H / 2 + 6);

        const tx = NAME_W;
        const tw = w - NAME_W - PADDING;
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        roundRect(ctx, tx, y + 10, tw, LANE_H - 24, 8);
        ctx.fill();

        // Finish line
        for (let fy = y + 10; fy < y + LANE_H - 14; fy += 10) {
            ctx.fillStyle = fy % 20 === (y + 10) % 20 ? '#fff' : '#333';
            ctx.fillRect(tx + tw - 8, fy, 8, 10);
        }

        ctx.font = '28px serif';
        ctx.fillText('🐎', tx + 6, y + LANE_H / 2 + 10);
    });
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function selectHorse(index) {
    selectedHorse = index;
    document.querySelectorAll('.horse-btn').forEach((b, i) => {
        b.classList.toggle('selected', i === index);
    });
}
function cheerHorse() {
    if (!horseRaceActive) { showToast("Start a race first!", "error"); return; }
    if (cheerCooldown) { showToast("Already cheered!", "error"); return; }
    cheerActive = true;
    cheerMult = 2.5;
    cheerTicks = 10;
    cheerCooldown = true;
    const btn = document.getElementById("horse-cheer-btn");
    const cdEl = document.getElementById("cheer-cooldown");
    if (btn) { btn.disabled = true; btn.style.opacity = "0.4"; btn.textContent = "📣 Cheered!"; }
    if (cdEl) { cdEl.style.display = "block"; }
    showToast("📣 Your horse got a 0.5s boost!", "success");
}


function startHorseRace() {
    if (horseRaceActive) { showToast('Race in progress!', 'error'); return; }
    if (horseCooldown) { showToast('Please wait...', 'error'); return; }
    if (selectedHorse === null) { showToast('Pick a horse first!', 'error'); return; }

    const betAmount = parseFloat(document.getElementById('horse-bet').value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        showToast('Invalid bet amount', 'error'); return;
    }

    if (!horseCtx || !horseCanvas) { showToast('Track not ready, try again', 'error'); return; }

    balance -= betAmount;
    updateBalance();
    trackBet('horse', betAmount);
    horseRaceActive = true;
    cheerActive = false; cheerMult = 1.0; cheerTicks = 0; cheerCooldown = false;
    const cheerBtn = document.getElementById("horse-cheer-btn");
    if (cheerBtn) { cheerBtn.style.display = "block"; cheerBtn.disabled = false; }
    const cdEl = document.getElementById("cheer-cooldown");
    if (cdEl) cdEl.style.display = "none";
    horseCooldown = true;

    document.getElementById('horse-result').textContent = '🏁 Race in progress...';
    document.getElementById('horse-result').style.color = '#b1bad3';

    // Use logical (CSS) width, not canvas pixel width
    const w = parseInt(horseCanvas.style.width) || horseCanvas.width;
    const trackW = w - NAME_W - PADDING - 20;
    const winner = Math.floor(Math.random() * horses.length);

    // Per-horse state
    const positions = horses.map(() => 0);
    const activeEvents = horses.map(() => null);
    const eventLabels = horses.map(() => '');
    const eventColors = horses.map(() => '#fff');
    const eventTicks = horses.map(() => 0);

    // Schedule events
    const schedules = horses.map((h, i) => {
        const s = [];
        let t = 15 + Math.floor(Math.random() * 20);
        while (t < 110) {
            const ev = HORSE_EVENTS[Math.floor(Math.random() * HORSE_EVENTS.length)];
            const biased = i === winner
                ? (Math.random() < 0.45 ? HORSE_EVENTS[0] : ev)
                : (Math.random() < 0.4  ? HORSE_EVENTS[1] : ev);
            s.push({ tick: t, ev: biased });
            t += biased.duration + 8 + Math.floor(Math.random() * 15);
        }
        return s;
    });

    let tick = 0;
    let finished = false;
    const MIN_TICKS = 90;
    const BASE_SPEED = 1.5;

    const interval = setInterval(() => {
        tick++;
        const ctx = horseCtx;
        ctx.clearRect(0, 0, w, parseInt(horseCanvas.style.height) || horseCanvas.height);

        horses.forEach((h, i) => {
            const y = PADDING + i * LANE_H;
            const tx = NAME_W;
            const tw = w - NAME_W - PADDING;

            // Trigger event
            const sched = schedules[i];
            if (sched.length > 0 && tick >= sched[0].tick) {
                const ev = sched.shift().ev;
                activeEvents[i] = { ...ev, left: ev.duration };
                eventLabels[i] = ev.emoji + ' ' + ev.name;
                eventColors[i] = ev.color;
                eventTicks[i] = 30; // show label for 30 ticks
            }

            let mult = 1.0;
            if (activeEvents[i]) {
                mult = activeEvents[i].mult;
                activeEvents[i].left--;
                if (activeEvents[i].left <= 0) activeEvents[i] = null;
            }
            if (eventTicks[i] > 0) eventTicks[i]--;

            // Move horse
            const cheerBoost = (i === selectedHorse && cheerActive && cheerTicks > 0) ? cheerMult : 1.0;
            if (i === selectedHorse && cheerTicks > 0) cheerTicks--;
            if (cheerTicks === 0) cheerActive = false;
            const speed = BASE_SPEED * mult * cheerBoost * (0.85 + Math.random() * 0.3);
            positions[i] = Math.min(positions[i] + speed, trackW);

            // Draw lane bg
            const isWinnerLane = finished && i === winner;
            const isLoserLane = finished && i !== winner;
            ctx.fillStyle = isWinnerLane ? 'rgba(0,231,1,0.12)' : isLoserLane ? 'rgba(0,0,0,0.2)' : 'rgba(47,69,83,0.4)';
            roundRect(ctx, 0, y, w, LANE_H - 6, 10);
            ctx.fill();

            // Color bar
            ctx.fillStyle = isLoserLane ? 'rgba(100,100,100,0.4)' : h.color;
            roundRect(ctx, 0, y, 5, LANE_H - 6, 5);
            ctx.fill();

            // Name
            ctx.globalAlpha = isLoserLane ? 0.4 : 1.0;
            ctx.fillStyle = h.color;
            ctx.font = 'bold 15px sans-serif';
            ctx.fillText(h.name, 14, y + LANE_H / 2 + 6);

            // Track bg
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            roundRect(ctx, tx, y + 10, tw - 8, LANE_H - 24, 8);
            ctx.fill();

            // Finish line
            for (let fy = y + 10; fy < y + LANE_H - 14; fy += 10) {
                ctx.fillStyle = fy % 20 === (y + 10) % 20 ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
                ctx.fillRect(tx + tw - 14, fy, 8, 10);
            }

            // Horse emoji - bob up/down when moving
            const bob = mult > 0 ? Math.sin(tick * 0.4 + i) * 4 : 0;
            ctx.font = '28px serif';
            ctx.fillText('🐎', tx + 6 + positions[i], y + LANE_H / 2 + 10 + bob);

            // Event label
            if (eventTicks[i] > 0) {
                ctx.fillStyle = eventColors[i];
                ctx.font = 'bold 13px sans-serif';
                ctx.fillText(eventLabels[i], tx + 6 + positions[i], y + 12);
            }

            ctx.globalAlpha = 1.0;

            // Check finish
            if (i === winner && positions[i] >= trackW && tick >= MIN_TICKS && !finished) {
                finished = true;
            }
        });

        if (finished || tick >= 300) {
            clearInterval(interval);
            horseRaceActive = false;
            const cb = document.getElementById("horse-cheer-btn");
            if (cb) cb.style.display = "none";
            setTimeout(() => { horseCooldown = false; }, 3000);

            const resultEl = document.getElementById('horse-result');
            if (winner === selectedHorse) {
                const payout = betAmount * HORSE_ODDS;
                const profit = payout - betAmount;
                balance += payout;
                updateBalance();
                trackResult('horse', betAmount, payout);
                playWinSound(profit);
                createParticles('+$' + profit.toFixed(2), '#00e701');
                resultEl.textContent = '🏆 ' + horses[winner].name + ' wins! +$' + profit.toFixed(2);
                resultEl.style.color = '#00e701';
                showToast(horses[winner].name + ' wins! +$' + profit.toFixed(2), 'success');
            } else {
                trackResult('horse', betAmount, 0);
                playSound('lose');
                resultEl.textContent = '💔 ' + horses[winner].name + ' wins! Lost $' + betAmount.toFixed(2);
                resultEl.style.color = '#ff4757';
                showToast(horses[winner].name + ' won - you lost!', 'error');
            }
        }
    }, 50);
}
