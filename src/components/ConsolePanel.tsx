/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Terminal, Sparkles, HelpCircle, CornerDownLeft } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "error" | "input";
  message: string;
}

interface ConsolePanelProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  toggleTheme: () => void;
}

const CHIPS = [
  { cmd: "projects", label: "projects" },
  { cmd: "skills", label: "skills" },
  { cmd: "theme", label: "theme" },
  { cmd: "help", label: "help" },
  { cmd: "clear", label: "clear" },
];

export default function ConsolePanel({
  currentRoute,
  onNavigate,
  toggleTheme,
}: ConsolePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<LogEntry[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "SYSTEM SHELL: Interactive Terminal Sync Ready.\n" +
        "This console is fully bound to the layout routing state.\n" +
        "Type 'help' or click any of the quick command labels to control the interface."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Monitor routing changes to provide user feedback
  useEffect(() => {
    const routeName = currentRoute === "#/" ? "root_homepage" : `projects/${currentRoute.split("/").pop()}`;
    addLog("info", `Navigation Event: Active view updated to [ ${routeName} ]`);
  }, [currentRoute]);

  // Handle scrolling to bottom
  useEffect(() => {
    if (isOpen && consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const addLog = (type: "info" | "success" | "error" | "input", message: string) => {
    const time = new Date().toLocaleTimeString();
    setHistory(prev => [...prev, { timestamp: time, type, message }]);
  };

  const executeCommand = (rawCmd: string) => {
    const cleanCmd = rawCmd.trim();
    if (!cleanCmd) return;

    addLog("input", `$ ${cleanCmd}`);

    setCmdHistory(prev => {
      const filtered = prev.filter(c => c !== cleanCmd);
      return [...filtered, cleanCmd];
    });
    setHistoryIndex(-1);

    const cmd = cleanCmd.toLowerCase();
    const parts = cmd.split(" ");
    const primary = parts[0];
    const args = parts.slice(1);

    switch (primary) {
      case "help":
        addLog("info",
          "===========================================================\n" +
          "PORTFOLIO COMPLIANT INTERACTIVE SHELL MANUAL\n" +
          "===========================================================\n" +
          "  help               Print this assistance directory\n" +
          "  ls / projects      List all interactive project codebases\n" +
          "  cd <project_id>    Navigate to specific project page (e.g. 'cd dophelper')\n" +
          "  cd ..              Return back to root homepage directory\n" +
          "  cat <project_id>   Examine raw tech specs inside terminal buffer\n" +
          "  skills             Inspect full skills directory payload\n" +
          "  theme              Trigger theme stylesheet variable toggling\n" +
          "  clear              Clear log buffer history entries\n" +
          "==========================================================="
        );
        break;

      case "clear":
        setHistory([]);
        break;

      case "ls": {
        const target = args[0];
        if (target) {
          if (target.toLowerCase() === "projects") {
            addLog("success",
              "DIRECTORY INDEX: /projects/\n" +
              "-----------------------------------------------------------\n" +
              "  • dophelper      [SYS]  Postal Web Automation (PySide6/Selenium)\n" +
              "  • aidesk         [AI]   Voice & Text Systems Assistant (Python)\n" +
              "  • dophelper-v2   [SYS]  Postal Desktop Automation (Electron/Playwright)\n" +
              "-----------------------------------------------------------\n" +
              "Tip: Type 'cd <project_id>' to open custom project view."
            );
          } else if (target.toLowerCase() === "skills" || target.toLowerCase() === "skills.json") {
            addLog("error", "ERR: 'skills' is an executable command, not a directory. Type 'skills' to execute.");
          } else {
            addLog("error", `ls: cannot access '${target}': No such file or directory`);
          }
        } else {
          addLog("success",
            "DIRECTORY INDEX: /projects/\n" +
            "-----------------------------------------------------------\n" +
            "  • dophelper      [SYS]  Postal Web Automation (PySide6/Selenium)\n" +
            "  • aidesk         [AI]   Voice & Text Systems Assistant (Python)\n" +
            "  • dophelper-v2   [SYS]  Postal Desktop Automation (Electron/Playwright)\n" +
            "-----------------------------------------------------------\n" +
            "Tip: Type 'cd <project_id>' to open custom project view."
          );
        }
        break;
      }

      case "projects": {
        if (args.length > 0) {
          addLog("error", "Usage: projects (type 'projects' or 'ls' with no arguments to list project indices).");
        } else {
          addLog("success",
            "DIRECTORY INDEX: /projects/\n" +
            "-----------------------------------------------------------\n" +
            "  • dophelper      [SYS]  Postal Web Automation (PySide6/Selenium)\n" +
            "  • aidesk         [AI]   Voice & Text Systems Assistant (Python)\n" +
            "  • dophelper-v2   [SYS]  Postal Desktop Automation (Electron/Playwright)\n" +
            "-----------------------------------------------------------\n" +
            "Tip: Type 'cd <project_id>' to open custom project view."
          );
        }
        break;
      }

      case "cd": {
        const target = args[0];
        if (!target || target === "..") {
          onNavigate("#/");
          addLog("success", "NAVIGATION: Process working directory shifted to root '/'.");
        } else if (["dophelper", "aidesk", "dophelper-v2"].includes(target)) {
          onNavigate(`#/project/${target}`);
          addLog("success", `NAVIGATION: Working directory changed to '/projects/${target}'.`);
        } else {
          addLog("error", `ERR: Unknown project locator '${target}'. Type 'ls' to see active records.`);
        }
        break;
      }

      case "cat": {
        const target = args[0];
        if (!target) {
          addLog("error", "Usage: cat <project_id> (e.g. 'cat dophelper')");
          break;
        }

        if (target === "dophelper") {
          addLog("success",
            "SPECIFICATION FILE: dophelper.md\n" +
            "  Project     : DOPHelper Postal Automation Suite\n" +
            "  Stack       : Python, PySide6, Selenium, openpyxl, pandas\n" +
            "  Metric      : Ingestion throughput benchmarked at 2,500 cols/s\n" +
            "  Description : PySide6 desktop automation saving agents ~40 minutes per compiled report."
          );
        } else if (target === "aidesk") {
          addLog("success",
            "SPECIFICATION FILE: aidesk.md\n" +
            "  Project     : AIDesk Voice & Text Systems Assistant\n" +
            "  Stack       : Python, SpeechRecognition, PyAudio, Gemini API\n" +
            "  Metric      : Asynchronous voice decoding latency < 180 ms\n" +
            "  Description : Desktop assistant running custom local screenshots, browser and system commands."
          );
        } else if (target === "dophelper-v2") {
          addLog("success",
            "SPECIFICATION FILE: dophelper-v2.md\n" +
            "  Project     : DOPHelper v2 Electron Automation\n" +
            "  Stack       : Electron.js, Playwright, SQLite, SheetJS, React\n" +
            "  Metric      : Local SQLite database querying latency < 1.8 ms\n" +
            "  Description : Heavy-duty postal agent automation suite running Playwright CDPs in dedicated workers."
          );
        } else {
          addLog("error", `ERR: Specification file '${target}' not found.`);
        }
        break;
      }

      case "skills":
        addLog("info",
          "DATA ATTACHMENT READ: skills.json\n" +
          JSON.stringify({
            languages: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
            frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML/CSS/JS", "Material-UI"],
            backend: ["Node.js", "Express.js", "FastAPI", "RESTful APIs"],
            databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
            ai_ml: ["TensorFlow", "Scikit-learn", "NLP", "Computer Vision", "Deep Learning", "GenAI"],
            tools: ["Git", "Linux", "Playwright", "Selenium", "Pandas", "Numpy"]
          }, null, 2)
        );
        break;

      case "theme":
        toggleTheme();
        addLog("success", "THEME ACTION: dynamic dark/light configuration variables updated.");
        break;

      default:
        addLog("error", `Command '${primary}' not found. Type 'help' to review current system control commands.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal;
    setInputVal("");
    executeCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputVal(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(newIndex);
        setInputVal(cmdHistory[newIndex]);
      }
    }
  };

  const handleChipClick = (cmd: string) => {
    executeCommand(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <aside className="mt-8 border border-slate-800 rounded-lg overflow-hidden bg-slate-950 font-mono text-xs transition duration-200 shadow-md text-left">
      <header className="flex justify-between items-center px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-[10px] uppercase text-slate-400 tracking-wider font-semibold select-none text-left">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-slate-400" />
          <span>Interactive Core Shell</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-white dark:hover:text-white cursor-pointer px-2 py-0.5 border border-dashed border-slate-700 hover:border-slate-500 rounded text-[9px] text-slate-400 transition-colors"
        >
          {isOpen ? "[ Minimize ]" : "[ Maximize ]"}
        </button>
      </header>

      {isOpen ? (
        <section className="p-4 flex flex-col gap-3 text-left" aria-label="Interactive portfolio terminal">
          {/* Main Terminal Output Stream Buffer */}
          <div className="max-h-60 overflow-y-auto space-y-2 bg-black/60 border border-slate-800/80 p-3.5 rounded-lg text-left [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-950 [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-md hover:[&::-webkit-scrollbar-thumb]:bg-slate-700">
            {history.map((log, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed text-[11px] text-left">
                <span className="text-[9px] text-slate-500 select-none mr-2">
                  [{log.timestamp}]
                </span>
                <span className={
                  log.type === "success" ? "text-emerald-400 font-medium" :
                    log.type === "error" ? "text-rose-400 font-medium" :
                      log.type === "input" ? "text-sky-400 font-semibold" :
                        "text-slate-300"
                }>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={consoleBottomRef} />
          </div>

          {/* Core Command Chips for Direct Mouse Interaction */}
          <div className="flex flex-wrap gap-1.5 items-center text-left">
            <span className="text-[10px] text-slate-400 mr-1 uppercase flex items-center gap-1 select-none font-bold">
              <Sparkles size={10} />
              Quick Actions:
            </span>
            {CHIPS.map(chip => (
              <button
                key={chip.cmd}
                onClick={() => handleChipClick(chip.cmd)}
                className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700/60 hover:text-white text-slate-300 transition-colors cursor-pointer font-mono"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Interactive Shell Input Form */}
          <form onSubmit={handleFormSubmit} className="flex gap-2 items-center border-t border-slate-800/80 pt-3 text-left">
            <div className="flex items-center gap-1.5 text-sky-500 font-bold select-none text-[11px]">
              <span>portfolio@user</span>
              <span className="text-slate-500">$</span>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onKeyDown={handleKeyDown}
              onChange={e => setInputVal(e.target.value)}
              placeholder="e.g. 'help', 'projects', 'cd dophelper', 'theme'..."
              className="flex-1 bg-slate-900 p-2 border border-slate-800 rounded-md font-mono text-[11px] focus:outline-none focus:border-slate-500 text-slate-100 placeholder-slate-600 block text-left"
              aria-label="Interactive command prompt interface"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />

            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center gap-1 text-[11px] cursor-pointer border border-transparent font-medium"
              aria-label="Submit command"
            >
              <span>Submit</span>
              <CornerDownLeft size={10} />
            </button>
          </form>
        </section>
      ) : (
        <summary className="p-2.5 px-4 text-[10px] text-left text-slate-400 list-none flex justify-start items-center gap-3 cursor-pointer bg-slate-950 hover:bg-slate-900" onClick={() => setIsOpen(true)}>
          <span>Buffer: {history.length} operations logged</span>
          <span>•</span>
          <span>Scope: {currentRoute === "#/" ? "Root Segment" : "Project Node"}</span>
          <span>•</span>
          <span className="flex items-center gap-1 hover:underline text-slate-300">
            <HelpCircle size={10} />
            [ Open Terminal Shell ]
          </span>
        </summary>
      )}
    </aside>
  );
}

