const TOTAL_STEPS = 12;
const STORAGE_KEY = "python-template-lab-progress";
const PLATFORM_KEY = "python-template-lab-platform";

const state = loadProgress();
const lessons = [...document.querySelectorAll(".lesson")];
const navItems = [...document.querySelectorAll("#step-nav-list li")];
const stepDots = document.querySelector("#step-dots");
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const toast = document.querySelector("#toast");
let toastTimer;

// Restore a student's place so a refresh never wipes out their lab progress.
function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return {
            currentStep: Math.min(Math.max(Number(saved?.currentStep) || 1, 1), TOTAL_STEPS),
            completed: Array.isArray(saved?.completed) ? saved.completed : []
        };
    } catch (error) {
        return { currentStep: 1, completed: [] };
    }
}

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderStep() {
    lessons.forEach((lesson) => {
        lesson.classList.toggle("is-active", Number(lesson.dataset.step) === state.currentStep);
    });

    navItems.forEach((item) => {
        const step = Number(item.querySelector("button").dataset.goTo);
        item.classList.toggle("is-active", step === state.currentStep);
        item.classList.toggle("is-done", state.completed.includes(step));
    });

    stepDots.innerHTML = Array.from({ length: TOTAL_STEPS }, (_, index) => {
        const step = index + 1;
        const dot = document.createElement("span");
        dot.className = `${step === state.currentStep ? "is-active " : ""}${state.completed.includes(step) ? "is-done" : ""}`;
        return dot;
    }).map((dot) => dot.outerHTML).join("");

    const percent = Math.round((state.completed.length / TOTAL_STEPS) * 100);
    document.querySelector("#step-label").textContent = `Step ${state.currentStep} of ${TOTAL_STEPS}`;
    document.querySelector("#progress-percent").textContent = `${percent}% complete`;
    document.querySelector("#progress-fill").style.width = `${percent}%`;
    backButton.disabled = state.currentStep === 1;
    nextButton.innerHTML = state.currentStep === TOTAL_STEPS ? "Finish Lab <span>🎉</span>" : "I've finished this <span>→</span>";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToStep(step) {
    if (step < 1 || step > TOTAL_STEPS) return;
    state.currentStep = step;
    saveProgress();
    renderStep();
}

// Mark the current lesson complete, then move forward. Students can navigate freely.
function advance() {
    if (!state.completed.includes(state.currentStep)) state.completed.push(state.currentStep);
    if (state.currentStep < TOTAL_STEPS) state.currentStep += 1;
    saveProgress();
    renderStep();
}

function copyText(text, button) {
    const showCopied = () => {
        button.textContent = "Copied ✓";
        button.classList.add("is-copied");
        showToast("Copied to clipboard");
        setTimeout(() => {
            button.textContent = "Copy";
            button.classList.remove("is-copied");
        }, 1600);
    };

    const fallbackCopy = () => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (copied) showCopied();
        else showToast("Copy failed — select the code instead");
    };

    if (navigator.clipboard) navigator.clipboard.writeText(text).then(showCopied).catch(fallbackCopy);
    else fallbackCopy();
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function setPlatform(platform) {
    localStorage.setItem(PLATFORM_KEY, platform);
    document.querySelectorAll(".platform-tab").forEach((tab) => {
        const selected = tab.dataset.platform === platform;
        tab.classList.toggle("is-selected", selected);
        tab.setAttribute("aria-selected", selected);
    });
    document.querySelectorAll(".platform-panel").forEach((panel) => {
        panel.classList.toggle("is-selected", panel.dataset.platformPanel === platform);
    });
}

document.querySelectorAll("[data-go-to]").forEach((button) => {
    button.addEventListener("click", () => goToStep(Number(button.dataset.goTo)));
});
nextButton.addEventListener("click", advance);
backButton.addEventListener("click", () => goToStep(state.currentStep - 1));
document.querySelector("#restart-lab").addEventListener("click", () => goToStep(1));

document.querySelector("#reset-progress").addEventListener("click", () => {
    if (window.confirm("Reset all lab progress?")) {
        state.currentStep = 1;
        state.completed = [];
        saveProgress();
        renderStep();
        showToast("Progress reset");
    }
});

document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy, button));
});
document.querySelectorAll(".platform-tab").forEach((tab) => {
    tab.addEventListener("click", () => setPlatform(tab.dataset.platform));
});

setPlatform(localStorage.getItem(PLATFORM_KEY) || "mac");
renderStep();
