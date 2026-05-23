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
  const [isOpen, setIsOpen] = useState(true);
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
          "  cd <project_id>    Navigate to specific project page (e.g. 'cd neuroflow')\n" +
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
              "  • omnisearch-ai   [AI]   Vector Hybrid Search (SLA 11ms)\n" +
              "  • velosync-cache  [SYS]  LSM KV caching engine (Rust/Go)\n" +
              "  • aether-vm       [COMP] 16-bit sandbox byte assembler\n" +
              "  • neuroflow       [AI]   Matrix Autograd Tensor from scratch\n" +
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
            "  • omnisearch-ai   [AI]   Vector Hybrid Search (SLA 11ms)\n" +
            "  • velosync-cache  [SYS]  LSM KV caching engine (Rust/Go)\n" +
            "  • aether-vm       [COMP] 16-bit sandbox byte assembler\n" +
            "  • neuroflow       [AI]   Matrix Autograd Tensor from scratch\n" +
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
            "  • omnisearch-ai   [AI]   Vector Hybrid Search (SLA 11ms)\n" +
            "  • velosync-cache  [SYS]  LSM KV caching engine (Rust/Go)\n" +
            "  • aether-vm       [COMP] 16-bit sandbox byte assembler\n" +
            "  • neuroflow       [AI]   Matrix Autograd Tensor from scratch\n" +
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
        } else if (["omnisearch-ai", "velosync-cache", "aether-vm", "neuroflow"].includes(target)) {
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
          addLog("error", "Usage: cat <project_id> (e.g. 'cat neuroflow')");
          break;
        }

        if (target === "omnisearch-ai") {
          addLog("success", 
            "SPECIFICATION FILE: omnisearch-ai.md\n" +
            "  Project     : OmniSearch AI Elastic Pipeline\n" +
            "  Stack       : FastAPI, Milvus DB, Python, NumPy, Gemini Embedding\n" +
            "  Metric      : P50 latency benchmarked at 11.4ms\n" +
            "  Description : Semantic embedding index resolving high-dimensional similarity matches."
          );
        } else if (target === "velosync-cache") {
          addLog("success", 
            "SPECIFICATION FILE: velosync-cache.md\n" +
            "  Project     : VeloSync LSM Storage Cache\n" +
            "  Stack       : Rust, Go, RESP Protocol, Bloom Compactions\n" +
            "  Metric      : Ingestion benchmarks hit 410,000 requests/sec\n" +
            "  Description : Segmented log-structured write paths handling fast sequential flushes."
          );
        } else if (target === "aether-vm") {
          addLog("success", 
            "SPECIFICATION FILE: aether-vm.md\n" +
            "  Project     : Aether-VM Emulator & Compiler\n" +
            "  Stack       : TypeScript, Uint16Array Buffers, HTML Canvas\n" +
            "  Metric      : Instruction frequency averages 12.5 MIPS\n" +
            "  Description : Custom 16-bit instructions parser with binary file output streams."
          );
        } else if (target === "neuroflow") {
          addLog("success", 
            "SPECIFICATION FILE: neuroflow.md\n" +
            "  Project     : NeuroFlow NumPy Autograd Neural Framework\n" +
            "  Stack       : Python 3, NumPy Array Slicing, Pure Calculus Linear\n" +
            "  Metric      : Accuracies on MNIST dataset computed at 97.8%\n" +
            "  Description : Self-contained automatic differentiation sorting partial weights backward."
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
            languages: ["TypeScript", "Golang", "Rust", "Python", "C/C++", "HTML5/CSS3"],
            architecture: {
              neuralNetworks: ["Autograd", "Vector Search", "Gemini Middleware", "RAG Pipeline"],
              systems: ["LSM-Tree KeyValue Store", "TCP RESP", "Compilers", "Docker Integration"],
              frontend: ["Clean Semantic markup", "Grid/Flex layouts", "Tailwind styling", "TSX Routing"]
            },
            status: "Seeking premium enterprise-level software challenges"
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
              placeholder="e.g. 'help', 'projects', 'cd omnisearch-ai', 'theme'..."
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

