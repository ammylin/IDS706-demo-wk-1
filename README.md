[![Python tests](https://github.com/ammylin/IDS706-demo-wk-1/actions/workflows/test.yml/badge.svg)](https://github.com/ammylin/IDS706-demo-wk-1/actions/workflows/test.yml)

# Software Engineering Basics Demo

A small Python project for practicing virtual environments, dependencies,
Makefiles, tests, Docker, and GitHub Actions. The demo asks for a user's name
and prints a welcome message for the Data Engineering course.

## Live demo

Published demo: https://ammylin.github.io/IDS706-demo-wk-1/

## Setup

Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Windows setup

The commands above are for macOS and Linux. On Windows, follow these steps
instead. Do them once, in order, and every later command in this README will
work the same as on a Mac.

1. Open **PowerShell**: press the Windows key, type `PowerShell`, and press
   Enter.
2. Install `make` (it comes with macOS and Linux but not with Windows). Paste
   this line and press Enter:

   ```powershell
   winget install ezwinports.make
   ```

   If asked to agree to terms, type `Y` and press Enter.
3. **Close PowerShell and open it again.** This step is required so Windows
   can find the new `make` command. Check it worked:

   ```powershell
   make --version
   ```

   You should see `GNU Make`.
4. Allow PowerShell to activate virtual environments (a one-time setting):

   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   ```

   Type `Y` and press Enter if asked.
5. Move into the project folder with `cd`, then create and activate the
   virtual environment. Note that Windows uses `python` (not `python3`) and a
   `Scripts` folder (not `bin`):

   ```powershell
   python -m venv .venv
   .venv\Scripts\activate
   ```

   Your prompt should now start with `(.venv)`. You are ready to continue
   with `make install` below.

Install the project dependencies:

```bash
make install
```

Windows users: if `make` is not recognized, go back to the **Windows setup**
steps above.

## Run

Run the demo:

```bash
make run
```

Enter a name when prompted. For example, entering `Ammy` displays:

```text
Ammy, welcome to the Data Engineering course.
```

Run the tests:

```bash
make test
```

You can also run the application and clean local Python cache files with:

```bash
make run
make clean
```

The test suite also runs automatically through GitHub Actions on pushes and
pull requests.

## Run with Docker 

Docker packages the Python version, dependencies, source code, and startup
command into a portable image. This helps the project behave consistently on
different computers and gives GitHub Actions the same kind of environment to
test.

Make sure Docker Desktop is installed and running, then build the image:

```bash
make docker-build
```

Run the interactive program in the container:

```bash
make docker-run
```

Run the tests inside the container:

```bash
make docker-test
```

The `Dockerfile` defines the image recipe, while `.dockerignore` keeps local
files such as `.venv` and cache directories out of the image. The Docker image
is named `data-engineering-demo` by the Makefile.

The required lab work is to replicate the provided Python, test, Dockerfile,
and Docker commands. Students may optionally change the message, improve the
input handling, add tests or related functions, or improve the container setup
for 1-3 bonus points.

For extra credit, add `make format` and `make lint` commands to the Makefile
and run them locally and in GitHub Actions. `make format` is worth 1 point,
and `make lint` is worth 1 separate point.

## Demonstrate GitHub Actions

1. Commit and push the repository to GitHub.
2. Open the repository's **Actions** tab.
3. Select **Python tests**.
4. Select **Run workflow**, choose the `main` branch, and run it.
5. Open the workflow run to show the install, test, Docker build, and container
	test steps.

To demonstrate a failing workflow, temporarily change the expected result in
`tests/test_main.py`, push the change, and then restore it after showing the
failed run.

## Run the interactive lab

The lab is a static site made with HTML, CSS, and vanilla JavaScript. You can
launch it locally by serving the repository and opening the page in your browser:

```bash
python3 -m http.server 8000
```

On Windows use `python -m http.server 8000`.

Then visit:

- `http://localhost:8000`
- or open `index.html` directly in a browser
- live GitHub Pages demo: https://ammylin.github.io/IDS706-demo-wk-1/

This project is designed to be run as a local demo in the browser while the
Python project logic is tested from the terminal.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. Open the repository's **Settings** tab.
3. Select **Pages** in the left sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Open the published URL shown by GitHub Pages.

GitHub Pages serves `index.html` from the repository root. No backend or build
step is required.