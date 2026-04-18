import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Map as MapIcon,
  TrendingUp,
  CloudRain,
  Car,
  ShieldAlert,
  History,
  CheckCircle2,
  Terminal as TerminalIcon,
  ChevronRight,
  Settings2,
  Activity,
  Cpu,
  Globe,
  Database,
  Wifi,
  AlertCircle,
  X,
  Sliders,
  Eye,
  Bell,
  Lock,
  Printer,
  Menu,
  Volume2,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import AIThinkingLoader from '../components/AIThinkingLoader';
import NeuralGridCanvas from '../components/NeuralGridCanvas';
import GlobalMapOverlay from '../components/GlobalMapOverlay';
import SmartNotification from '../components/SmartNotification';
import { sounds } from '../utils/sounds';
import { voiceAssistant } from '../utils/voiceProtocol';

const Dashboard = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [activeScenario, setActiveScenario] = useState('none');
  const [logs, setLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [optimizationScore, setOptimizationScore] = useState(92);
  const [decisionReason, setDecisionReason] = useState("SYSTEM NOMINAL: Monitoring grid for anomalies.");
  const [history, setHistory] = useState([
    { id: 'H1', scenario: 'traffic', timestamp: 'T-15:42', score: 88, status: 'SYNC_VERIFIED' },
    { id: 'H2', scenario: 'rain', timestamp: 'T-45:10', score: 94, status: 'SYNC_VERIFIED' }
  ]);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeAnomaly, setActiveAnomaly] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isRemoteLinking, setIsRemoteLinking] = useState(false);
  const [remoteLinkComplete, setRemoteLinkComplete] = useState(false);
  const [advancedReport, setAdvancedReport] = useState(null);
  const [showAdvancedReport, setShowAdvancedReport] = useState(false);
  const [scanningArea, setScanningArea] = useState(false);
  const [detectedPoints, setDetectedPoints] = useState([]);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState('ops'); // 'ops' or 'intel'
  const [activeNodeTab, setActiveNodeTab] = useState('logs'); // 'logs' or 'reports'

  const tacticalAdvice = {
    none: {
      status: "STABLE",
      advice: "Maintain current flow. Sector 72 is at 94% efficiency. No anomalies detected in current window.",
      threats: "NONE",
      optimization: "ENABLED"
    },
    traffic: {
      status: "CONGESTED",
      advice: "Execute Reroute Beta-9. Gridlock on Sector 7 Arterial. AI suggesting 12% faster bypass via industrial corridor.",
      threats: "MEDIUM - INFRASTRUCTURE",
      optimization: "ACTIVE_REROUTE"
    },
    rain: {
      status: "VOLATILE",
      advice: "Pre-emptive storm-cell avoidance active. Diverting high-value assets to covered transit nodes. Latency may increase by 4ms.",
      threats: "HIGH - WEATHER",
      optimization: "SAFETY_PRIORITY"
    },
    accident: {
      status: "CRITICAL",
      advice: "Asset collision at Nexus-9. Emergency bypass protocol engaged. 14 surrounding units shifted to redundant paths.",
      threats: "EXTREME - COLLISION",
      optimization: "EMERGENCY_RECOVERY"
    },
    chaos: {
      status: "SYSTEM_STRESS",
      advice: "Multiple threat vectors detected. Engaging Neural Self-Healing. Assets are being distributed to secondary nodes to prevent total network failure.",
      threats: "MULTIPLE - GLOBAL",
      optimization: "SURVIVAL_MODE"
    }
  };

  const currentAdvice = tacticalAdvice[activeScenario] || tacticalAdvice.none;
  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem('logimind_reports');
    return savedReports ? JSON.parse(savedReports) : [];
  });
  const reportRef = useRef(null);

  // Settings State
  const [settings, setSettings] = useState({
    autoOptimize: true,
    threatLevel: 'standard',
    neuralPrecision: 98,
    darkFiber: true,
    soundEnabled: true,
    globalMode: false
  });

  const [telemetry, setTelemetry] = useState({
    latency: 14.2,
    precision: 99.98
  });

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${time}] ${type.toUpperCase()}: ${msg}`, ...prev].slice(0, 50));
  };

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    if (settings.soundEnabled) {
      if (type === 'success') sounds.playSuccess();
      else if (type === 'warning' || type === 'error') sounds.playAlert();
      else sounds.playClick();
    }
  };

  useEffect(() => {
    localStorage.setItem('logimind_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    sounds.init();
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Jitter Score
      setOptimizationScore(prev => {
        const jitter = Math.random() > 0.7 ? (Math.random() > 0.5 ? 0.5 : -0.5) : 0;
        const base = activeScenario === 'chaos' ? 42 : (activeScenario === 'none' ? 92 : 85);
        const target = base + (settings.neuralPrecision - 98) * 0.1;
        return parseFloat(Math.min(100, Math.max(10, (prev * 0.9 + target * 0.1) + jitter)).toFixed(1));
      });

      // Jitter Telemetry
      setTelemetry(prev => ({
        latency: parseFloat((14 + Math.random() * 2).toFixed(1)),
        precision: parseFloat((settings.neuralPrecision - 0.02 + Math.random() * 0.04).toFixed(2))
      }));

      // Random "Real" Detection Simulation
      const detectionChance = settings.threatLevel === 'paranoid' ? 0.95 : (settings.threatLevel === 'aggressive' ? 0.97 : 0.99);
      if (Math.random() > detectionChance && activeScenario === 'none' && !isThinking && !activeAnomaly) {
        const anomalies = [
          { name: 'Unscheduled Maintenance', id: 'MNT_01' },
          { name: 'Sensor Ghosting', id: 'SNS_42' },
          { name: 'Route Friction', id: 'RTC_99' },
          { name: 'Power Surge', id: 'PWR_X' }
        ];
        const picked = anomalies[Math.floor(Math.random() * anomalies.length)];
        setActiveAnomaly(picked);
        addLog(`ALERT: ${picked.name} detected in Grid ${picked.id}.`, "warning");
        showNotify(`Anomaly Detected: ${picked.name}`, "info");
      }
    }, 1000);

    addLog("LOGIMIND_CORE INITIALIZED. AWAITING MISSION COMMAND.", "system");
    showNotify("Neural Link Established", "info");

    return () => clearInterval(timer);
  }, [activeScenario, settings.neuralPrecision]);

  const triggerScenario = (s) => {
    if (s === 'none') {
      setActiveScenario('none');
      setIsChaosMode(false);
      setEmergencyMode(false);
      setDecisionReason("SYSTEM NOMINAL: Monitoring grid for anomalies.");
      setOptimizationScore(92);
      showNotify("System Restored to Nominal", "success");
      addLog("CORE_RESET: All parameters normalized.", "info");
      voiceAssistant.speak("System restored to nominal status. Monitoring grid for future disruptions.");
      return;
    }

    setIsChaosMode(s === 'chaos');
    setActiveScenario(s);
    setEmergencyMode(s === 'accident' || s === 'chaos');
    setIsThinking(true);
    addLog(`INITIATING ${s.toUpperCase()} PROTOCOL...`, "warning");
    showNotify(`${s.toUpperCase()} Detected in Sector 72`, "info");

    const voiceMessages = {
      rain: "Storm cell detected in Sector 72. High flood probability. Calculating aquatic bypass.",
      traffic: "Major gridlock identified on Sector 7 Arterial. Rerouting fleet to industrial slipways.",
      accident: "Asset collision confirmed at Nexus-9. Emergency response initiated. Rerouting 14 units.",
      chaos: "Warning: Multiple vector failure detected. System stability critical. Initiating Chaos recovery protocol."
    };
    voiceAssistant.speak(voiceMessages[s] || `Warning: Disruption detected in sector 72. Initiating recovery protocol.`);

    setTimeout(() => {
      setIsThinking(false);
      const newScore = s === 'chaos' ? 42 : Math.floor(Math.random() * 10) + 85;
      setOptimizationScore(newScore);

      const reasons = {
        rain: `OPTIMIZED: Redirected LM-204 via High-Ground-Alpha due to 88% flood probability. ETA impact: -4min.`,
        traffic: `REROUTED: Gridlock detected on Sector 7 Arterial. AI calculated 12% faster bypass via industrial slipway.`,
        accident: `CRITICAL: Asset collision at Nexus-9. Emergency reroute active for 14 surrounding units.`,
        chaos: `STABILIZING: Multi-vector failure detected. Neural Mesh operating in fail-safe mode. Rerouting all assets to perimeter nodes.`
      };

      setDecisionReason(reasons[s] || "SYSTEM NOMINAL: Monitoring grid for anomalies.");
      addLog(`SYSTEM ${s === 'chaos' ? 'STABILIZED' : 'OPTIMIZED'}. NEW SCORE: ${newScore}%`, "success");
      showNotify(`Optimization Complete: ${newScore}% Efficiency`, "success");

      if (!isReplaying) {
        setHistory(prev => [{
          id: `H_${Date.now()}`,
          scenario: s,
          timestamp: 'NOW',
          score: newScore,
          status: s === 'chaos' ? 'STABILIZED' : 'RESOLVED'
        }, ...prev].slice(0, 5));
      }
    }, 2500);
  };

  const handleFixAnomaly = () => {
    if (!activeAnomaly) return;
    setIsThinking(true);
    addLog(`FIX_PROTO: Resolving ${activeAnomaly.id}...`, "info");

    setTimeout(() => {
      setIsThinking(false);
      addLog(`SUCCESS: ${activeAnomaly.name} resolved. Core stability increased.`, "success");
      showNotify("Anomaly Resolved Successfully", "success");
      setActiveAnomaly(null);
      setOptimizationScore(prev => Math.min(100, prev + 2));
    }, 2000);
  };

  const handleReplay = (item) => {
    setIsReplaying(true);
    triggerScenario(item.scenario);
    setTimeout(() => setIsReplaying(false), 3000);
  };

  const openStoredReport = (report) => {
    setAdvancedReport(report);
    setShowAdvancedReport(true);
  };

  const handleInitiateRemoteLink = () => {
    setIsRemoteLinking(true);
    addLog(`LINK: Establishing secure tunnel to ${selectedAsset.id}...`, "info");

    setTimeout(() => {
      setIsRemoteLinking(false);
      setRemoteLinkComplete(true);
      showNotify(`Remote Link Established: ${selectedAsset.id}`, "success");
      addLog(`SUCCESS: Encrypted uplink active for ${selectedAsset.id}.`, "success");
    }, 2500);
  };

  const generateReport = () => {
    setIsGeneratingReport(true);
    addLog("PRINT: Initializing mission summary output...", "info");

    setTimeout(() => {
      setIsGeneratingReport(false);
      showNotify("Mission Report Printed", "success");
      addLog("SUCCESS: MISSION_SUMMARY sent to hardware interface.", "success");
    }, 2000);
  };

  const handleAdvancedReport = () => {
    setScanningArea(true);
    setDetectedPoints([]);
    addLog("SCAN: Initiating high-resolution area sweep...", "info");

    // Simulate detecting points with mock coordinates
    const newPoints = Array.from({ length: 8 }).map((_, i) => {
      const x = 15 + Math.random() * 70;
      const y = 15 + Math.random() * 70;
      // Convert x,y to mock lat/long based on sector center (42.36, -71.05)
      const lat = (42.3601 + (y - 50) * 0.001).toFixed(4);
      const lng = (-71.0589 + (x - 50) * 0.001).toFixed(4);

      return {
        id: i,
        x,
        y,
        lat,
        lng,
        type: Math.random() > 0.7 ? 'hazard' : 'asset',
        label: Math.random() > 0.7 ? `NODE_${Math.floor(Math.random() * 900 + 100)}` : `UNIT_${Math.floor(Math.random() * 900 + 100)}`
      };
    });

    setTimeout(() => {
      setDetectedPoints(newPoints);
      addLog(`SCAN: ${newPoints.length} points of interest localized.`, "success");
    }, 1500);

    setTimeout(() => {
      setScanningArea(false);
      setShowAdvancedReport(true);
      setExportProgress(0); // Reset progress
      setAdvancedReport({
        timestamp: new Date().toISOString(),
        sector: "72-ALPHA",
        efficiency: optimizationScore,
        threats: newPoints.filter(p => p.type === 'hazard').length,
        assets: newPoints.filter(p => p.type === 'asset').length + 2,
        points: newPoints,
        recommendation: activeScenario === 'none' ? "MAINTAIN_NOMINAL_FLOW" : "EXECUTE_REROUTE_BETA"
      });
      showNotify("Advanced Tactical Report Ready", "success");
    }, 3000);
  };

  const handleExportData = async () => {
    if (!reportRef.current) return;

    setIsExporting(true);
    setExportProgress(10);
    addLog("PRINT: Formatting tactical data for hard-copy output...", "info");

    try {
      // Simulate "Data Preparation"
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(40);
      addLog("PRINT: Synchronizing graticules and telemetry nodes...", "info");

      await new Promise(resolve => setTimeout(resolve, 700));
      setExportProgress(70);
      addLog("PRINT: Finalizing layout synthesis...", "info");

      await new Promise(resolve => setTimeout(resolve, 500));
      setExportProgress(100);

      // Save to local reports history before printing
      const reportEntry = {
        ...advancedReport,
        id: `REP_${Date.now()}`,
        fileName: `TACTICAL_PRINT_${Date.now()}`,
        formattedTime: new Date().toLocaleTimeString()
      };
      setReports(prev => [reportEntry, ...prev]);

      // Trigger Browser Print
      window.print();

      setIsExporting(false);
      showNotify("Tactical Data Sent to Printer", "success");
      addLog(`SUCCESS: Tactical output cycle complete.`, "success");

    } catch (error) {
      console.error("Print Error:", error);
      setIsExporting(false);
      showNotify("Print Failed: Hardware Interface Error", "error");
      addLog("ERROR: Data output failed.", "error");
    }
  };

  const chartData = [
    { time: '00:00', val: 40 }, { time: '04:00', val: 30 }, { time: '08:00', val: 65 },
    { time: '12:00', val: 45 }, { time: '16:00', val: 90 }, { time: '20:00', val: 75 },
    { time: '23:59', val: 85 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 font-sans overflow-hidden selection:bg-cyan/30 relative pt-20 md:pt-24">
      <AIThinkingLoader isVisible={isThinking} />

      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="cyber-grid absolute inset-0" />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR: CORE METRICS & CONTROLS */}
      <aside className={`fixed inset-y-0 left-0 w-80 lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out z-50 border-r border-white/10 flex flex-col bg-slate-900/90 lg:bg-slate-900/20 backdrop-blur-xl no-print ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-white/10 bg-slate-900/40 flex justify-between items-center">
           <div>
              <div className="flex items-center gap-3 mb-1">
                 <div className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00f2ff]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan">Command Center</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white">LOGIMIND_CORE</h1>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <X size={20} />
           </button>
        </div>

        {/* SIDEBAR TAB SWITCHER */}
        <div className="flex border-b border-white/10 bg-black/20">
           <button
             onClick={() => setActiveSidebarTab('ops')}
             className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
               activeSidebarTab === 'ops' ? 'border-cyan text-cyan bg-cyan/5' : 'border-transparent text-slate-500 hover:text-slate-300'
             }`}
           >
             Core_Ops
           </button>
           <button
             onClick={() => setActiveSidebarTab('advice')}
             className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
               activeSidebarTab === 'advice' ? 'border-magenta text-magenta bg-magenta/5' : 'border-transparent text-slate-500 hover:text-slate-300'
             }`}
           >
             AI_Intel
           </button>
           <button
             onClick={() => setActiveSidebarTab('intel')}
             className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
               activeSidebarTab === 'intel' ? 'border-acid text-acid bg-acid/5' : 'border-transparent text-slate-500 hover:text-slate-300'
             }`}
           >
             Logs ({reports.length})
           </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {activeSidebarTab === 'ops' ? (
            <>
              {/* Optimization Score */}
              <section className="glass-card p-5 border-l-4 border-l-cyan relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap size={40} className="text-cyan" />
                </div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Efficiency Rating</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white font-mono">{optimizationScore}</span>
                  <span className="text-cyan font-bold">%</span>
                </div>
              </section>

              {/* Neural Analytics */}
              <section className="space-y-4">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Telemetry</p>
                 {[
                   { label: 'Latency', val: telemetry.latency, unit: 'ms', color: 'text-acid', icon: Wifi },
                   { label: 'Precision', val: telemetry.precision, unit: '%', color: 'text-cyan', icon: Database },
                   { label: 'Threat_Lvl', val: emergencyMode ? 'CRITICAL' : settings.threatLevel.toUpperCase(), unit: '', color: emergencyMode ? 'text-magenta' : 'text-slate-400', icon: AlertCircle }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center p-3 glass-card border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <stat.icon size={14} className={stat.color} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
                      </div>
                      <span className={`text-xs font-black font-mono ${stat.color}`}>{stat.val}{stat.unit}</span>
                   </div>
                 ))}
              </section>

              {/* Disruption Vectors */}
              <section className="space-y-4">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Threat Simulation</p>
                 <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'rain', label: 'Storm Cell', icon: CloudRain, color: 'magenta', activeClass: 'bg-magenta/10 border-magenta/50 text-white shadow-[0_0_15px_rgba(255,0,255,0.2)]', dotClass: 'bg-magenta text-black' },
                      { id: 'traffic', label: 'Gridlock', icon: Car, color: 'cyan', activeClass: 'bg-cyan/10 border-cyan/50 text-white shadow-[0_0_15px_rgba(0,242,255,0.2)]', dotClass: 'bg-cyan text-black' },
                      { id: 'chaos', label: 'Full Chaos', icon: Zap, color: 'red-500', activeClass: 'bg-red-500/10 border-red-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]', dotClass: 'bg-red-500 text-white' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => triggerScenario(s.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${
                          activeScenario === s.id
                          ? s.activeClass
                          : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${activeScenario === s.id ? s.dotClass : 'bg-white/5 group-hover:text-white'}`}>
                          <s.icon size={16} />
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase">{s.label}</span>
                        {activeScenario === s.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                      </button>
                    ))}
                    <button
                      onClick={() => triggerScenario('none')}
                      className="flex items-center justify-center gap-2 p-3 text-[10px] font-black uppercase text-slate-500 hover:text-cyan transition-colors"
                    >
                      <CheckCircle2 size={14} /> Reset System
                    </button>
                 </div>
              </section>
            </>
          ) : activeSidebarTab === 'advice' ? (
            <>
              {/* AI TACTICAL ADVICE SECTION */}
              <section className="space-y-6">
                <div className="glass-card p-5 border-l-4 border-l-magenta bg-magenta/5">
                   <p className="text-[10px] font-black text-magenta uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Cpu size={14} /> Neural Status
                   </p>
                   <div className="space-y-4">
                      <div>
                         <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Network Mode</p>
                         <p className={`text-sm font-black font-mono tracking-tighter ${activeScenario === 'none' ? 'text-cyan' : 'text-magenta'}`}>
                            {currentAdvice.status}
                         </p>
                      </div>
                      <div>
                         <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Optimization Protocol</p>
                         <p className="text-[10px] text-white font-mono bg-white/5 px-2 py-1 rounded inline-block">
                            {currentAdvice.optimization}
                         </p>
                      </div>
                   </div>
                </div>

                <div className="glass-card p-5 border border-white/10">
                   <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Tactical Intelligence</p>
                   <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                      <p className="text-xs font-bold text-slate-300 leading-relaxed italic uppercase">
                         "{currentAdvice.advice}"
                      </p>
                   </div>
                </div>

                <div className="glass-card p-5 border-l-4 border-l-red-500 bg-red-500/5">
                   <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <AlertCircle size={14} /> Threat Assessment
                   </p>
                   <p className="text-xl font-black text-white tracking-tighter font-mono">{currentAdvice.threats}</p>
                </div>

                <button
                  onClick={() => voiceAssistant.speak(currentAdvice.advice, "high")}
                  className="w-full py-4 glass-card border-cyan/30 text-cyan text-[10px] font-black uppercase tracking-widest hover:bg-cyan/10 transition-all flex items-center justify-center gap-3"
                >
                   <Volume2 size={16} /> Audio Briefing
                </button>
              </section>
            </>
          ) : (
            <>
              {/* Intel Log Tab Content */}
              <section className="space-y-4">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Mission Report History</p>
                 {reports.length === 0 ? (
                   <div className="p-8 border border-dashed border-white/10 rounded-xl text-center">
                      <Database size={24} className="mx-auto text-slate-700 mb-3" />
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">No reports archived</p>
                   </div>
                 ) : (
                   <div className="space-y-3">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          className="glass-card p-4 border-white/5 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer"
                          onClick={() => openStoredReport(report)}
                        >
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <div className="p-1.5 bg-acid/10 rounded text-acid">
                                    <ShieldAlert size={12} />
                                 </div>
                                 <span className="text-[10px] font-black text-white font-mono uppercase truncate max-w-[120px]">
                                    {report.sector}
                                 </span>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500">{report.formattedTime}</span>
                           </div>
                           <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                              <span>Eff: <span className="text-acid">{report.efficiency}%</span></span>
                              <span>Assets: <span className="text-cyan">{report.assets}</span></span>
                              <div className="flex items-center gap-1 text-acid group-hover:underline">
                                 <Eye size={10} /> VIEW
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </section>

              <section className="space-y-4">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Simulation Events</p>
                 <div className="space-y-3">
                    {history.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleReplay(item)}
                        className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-transparent hover:border-cyan/30 hover:bg-white/10 transition-all cursor-pointer group/item"
                      >
                         <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover/item:text-cyan group-hover/item:bg-cyan/10 transition-colors">
                            <History size={14} />
                         </div>
                         <div className="flex-1">
                            <p className="text-[9px] font-black text-white font-mono uppercase truncate">{item.scenario === 'chaos' ? 'CRITICAL_CHAOS' : `VEC_${item.scenario}`}</p>
                            <p className="text-[8px] font-bold text-slate-600 uppercase">{item.timestamp} | {item.status}</p>
                         </div>
                         <div className="text-[10px] font-black text-cyan opacity-40 group-hover/item:opacity-100">{item.score}%</div>
                      </div>
                    ))}
                 </div>
              </section>
            </>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT: THE BENTO GRID */}
      <main className="flex-1 h-full relative overflow-hidden flex flex-col p-6 gap-6 z-10">
         {/* TOP HUD BAR */}
         <header className="glass-card flex items-center justify-between p-3 md:p-4 bg-slate-900/40 border-white/5 no-print">
            <div className="flex items-center gap-4 md:gap-8">
               <button
                 onClick={() => setIsSidebarOpen(true)}
                 className="lg:hidden p-2 text-slate-400 hover:text-white"
               >
                 <Menu size={24} />
               </button>
               <div className="hidden sm:flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Network Time</span>
                  <span className="text-xs md:text-sm font-bold font-mono text-white">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
               </div>
               <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">System Protocol</span>
                  <span className={`text-xs md:text-sm font-bold uppercase ${emergencyMode ? (isChaosMode ? 'text-red-500 chaos-glitch-text' : 'text-magenta') : 'text-cyan'} flex items-center gap-2`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${emergencyMode ? (isChaosMode ? 'bg-red-500 animate-ping' : 'bg-magenta animate-pulse') : 'bg-cyan'}`} />
                    {isChaosMode ? 'KERNEL_COLLAPSE' : (emergencyMode ? 'Emergency' : 'Nominal')}
                  </span>
               </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
               <button
                onClick={handleAdvancedReport}
                disabled={isGeneratingReport || scanningArea}
                className="px-3 md:px-5 py-2 glass-card border-white/10 hover:border-acid/50 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all hover:bg-acid/5 text-acid flex items-center gap-2"
               >
                  {scanningArea ? (
                    <div className="w-3 h-3 border-2 border-acid/30 border-t-acid rounded-full animate-spin" />
                  ) : <Activity size={14} className="hidden xs:block" />}
                  <span className="xs:hidden">Scan</span>
                  <span className="hidden xs:block">Advanced Scan</span>
               </button>
               <button
                onClick={generateReport}
                disabled={isGeneratingReport}
                className="hidden sm:flex px-5 py-2 glass-card border-white/10 hover:border-cyan/50 text-10px font-black uppercase tracking-widest transition-all hover:bg-cyan/5 text-cyan items-center gap-2"
               >
                  {isGeneratingReport ? (
                    <div className="w-3 h-3 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                  ) : <Printer size={14} />}
                  Print Report
               </button>
               <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 glass-card border-white/10 text-slate-400 hover:text-white transition-colors"
               >
                  <Settings2 size={16} />
               </button>
            </div>
         </header>

         <AnimatePresence>
            {notification && (
              <SmartNotification
                key={notification.message}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}
         </AnimatePresence>

         {/* GRID LAYOUT */}
         <div className="flex-1 grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 md:gap-6 min-h-0 overflow-y-auto md:overflow-hidden pb-10 md:pb-0">
            {/* LARGE TACTICAL MAP AREA (8x4) */}
            <section className={`col-span-1 md:col-span-8 row-span-1 md:row-span-4 h-[400px] md:h-auto glass-card relative border-white/10 group transition-all duration-1000 ${
              emergencyMode ? 'threat-glow-critical' : ''
            } ${isChaosMode ? 'chaos-shake' : ''} ${settings.globalMode ? 'grayscale contrast-125 crt-effect' : ''}`}>

               {/* BACKGROUND WRAPPER (CLIPPED) */}
               <div className="absolute inset-0 overflow-hidden rounded-[inherit] z-0">
                  <NeuralGridCanvas
                    activeScenario={activeScenario}
                    isChaosMode={isChaosMode}
                    darkFiber={settings.darkFiber}
                    globalMode={settings.globalMode}
                  />
                  <GlobalMapOverlay />

                  <div className="scanline-laser opacity-20 pointer-events-none" />
                  <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none" />
               </div>

               {/* AI TACTICAL ADVICE OVERLAY (New Sidebar-like component inside Map) */}
               <div className="absolute top-24 left-4 z-30 w-48 hidden lg:block">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="glass-card bg-slate-950/80 border-cyan/20 p-3 space-y-3"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                       <Cpu size={14} className="text-cyan" />
                       <span className="text-[9px] font-black text-white uppercase tracking-wider">Tactical Intel</span>
                    </div>
                    <div className="space-y-2">
                       <div className="p-2 bg-cyan/5 rounded border border-cyan/10">
                          <p className="text-[8px] text-slate-400 uppercase font-bold mb-1">Route Status</p>
                          <p className="text-[10px] text-acid font-black font-mono">ALL_OPTIMAL</p>
                       </div>
                       <div className="p-2 bg-white/5 rounded border border-white/5">
                          <p className="text-[8px] text-slate-400 uppercase font-bold mb-1">AI Suggestion</p>
                          <p className="text-[10px] text-white font-bold leading-tight uppercase">
                            {activeScenario === 'none'
                              ? "Monitor Sector-7 for incoming weather fronts."
                              : "Diverting Assets to Alpha-9 node via bypass."}
                          </p>
                       </div>
                    </div>
                  </motion.div>
               </div>

               {/* INTERACTIVE ASSET LAYER */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Fleet Unit LM-204 */}
                  <motion.g
                    initial={false}
                    animate={{
                      x: activeScenario !== 'none' ? '60%' : '30%',
                      y: activeScenario !== 'none' ? '50%' : '25%'
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="cursor-pointer pointer-events-auto group/asset"
                    onClick={() => setSelectedAsset({ id: 'LM-204', type: 'Fleet_Truck', status: 'In_Transit', fuel: '82%', load: '94%', speed: '64 km/h' })}
                  >
                    <circle r="6" fill="#00f2ff" filter="url(#glow)" className="animate-pulse" />
                    <circle r="12" fill="transparent" stroke="#00f2ff" strokeWidth="1" strokeDasharray="2 2" className="animate-spin-slow" />
                    <text x="12" y="4" className="text-[10px] font-mono fill-cyan font-black tracking-tighter opacity-0 group-hover/asset:opacity-100 transition-opacity">LM-204</text>
                  </motion.g>

                  {/* Fleet Unit LM-109 */}
                  <motion.g
                    initial={false}
                    animate={{
                      x: activeScenario === 'chaos' ? '80%' : '70%',
                      y: activeScenario === 'chaos' ? '15%' : '60%'
                    }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="cursor-pointer pointer-events-auto group/asset"
                    onClick={() => setSelectedAsset({ id: 'LM-109', type: 'Cargo_Drone', status: 'Optimal', fuel: '91%', load: '22%', speed: '120 km/h' })}
                  >
                    <circle r="4" fill="#adff2f" filter="url(#glow)" />
                    <text x="10" y="4" className="text-[10px] font-mono fill-acid font-black tracking-tighter opacity-0 group-hover/asset:opacity-100 transition-opacity">LM-109</text>
                  </motion.g>
               </svg>

               {/* ASSET DETAIL OVERLAY */}
               <AnimatePresence>
                 {selectedAsset && (
                   <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="absolute z-30 top-16 md:top-24 right-4 md:right-8 p-4 md:p-5 glass-card bg-slate-950/90 border-cyan/30 w-48 md:w-56 shadow-[0_0_40px_rgba(0,242,255,0.15)] pointer-events-auto"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Asset_ID</span>
                            <span className="text-sm font-black text-cyan uppercase tracking-tighter">{selectedAsset.id}</span>
                         </div>
                         <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-white/5 rounded transition-colors">
                            <X size={16} className="text-slate-500" />
                         </button>
                      </div>
                      <div className="space-y-3">
                         {[
                           { label: 'Status', val: selectedAsset.status, color: 'text-acid' },
                           { label: 'Type', val: selectedAsset.type, color: 'text-white' },
                           { label: 'Speed', val: selectedAsset.speed, color: 'text-cyan' },
                           { label: 'Fuel/Bat', val: selectedAsset.fuel, color: 'text-white' },
                           { label: 'Load', val: selectedAsset.load, color: 'text-white' }
                         ].map((d, i) => (
                           <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-[8px] text-slate-500 uppercase font-bold">{d.label}</span>
                              <span className={`text-[10px] font-mono font-bold uppercase ${d.color}`}>{d.val}</span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-4 pt-2">
                         <button
                          onClick={handleInitiateRemoteLink}
                          disabled={isRemoteLinking || remoteLinkComplete}
                          className={`w-full py-2 border text-[9px] font-black uppercase tracking-widest transition-all ${
                            remoteLinkComplete
                            ? 'bg-acid/10 border-acid/30 text-acid'
                            : 'bg-cyan/10 border-cyan/30 text-cyan hover:bg-cyan hover:text-black'
                          }`}
                         >
                            {isRemoteLinking ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                                Linking...
                              </div>
                            ) : remoteLinkComplete ? 'Uplink Secure' : 'Initiate Remote Link'}
                         </button>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* ADVANCED DETECTION LAYER */}
               <div className="absolute inset-0 pointer-events-none z-10">
                  <AnimatePresence>
                    {scanningArea && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                         <motion.div
                          animate={{ scale: [0, 2], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="w-96 h-96 border-2 border-cyan/30 rounded-full"
                         />
                         <motion.div
                          animate={{ scale: [0, 2], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                          className="w-96 h-96 border-2 border-cyan/30 rounded-full"
                         />
                         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan/20 animate-pulse" />
                         <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan/20 animate-pulse" />
                      </motion.div>
                    )}

                    {detectedPoints.map((point) => (
                      <motion.div
                        key={point.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      >
                         <div className={`w-8 h-8 -translate-x-1/2 -translate-y-1/2 border rounded-full flex items-center justify-center ${
                           point.type === 'hazard' ? 'border-magenta animate-pulse bg-magenta/10' : 'border-cyan bg-cyan/10'
                         }`}>
                            <div className={`w-1 h-1 rounded-full ${point.type === 'hazard' ? 'bg-magenta' : 'bg-cyan'}`} />
                            <motion.div
                              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className={`absolute inset-0 border rounded-full ${point.type === 'hazard' ? 'border-magenta' : 'border-cyan'}`}
                            />
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>

               <div className="scanline-laser opacity-20 pointer-events-none" />
               <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none" />

               {/* REPLAY OVERLAY */}
               {isReplaying && (
                 <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-magenta/20 border border-magenta/50 px-3 py-1 rounded-full backdrop-blur-md">
                    <span className="w-2 h-2 bg-magenta rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-magenta uppercase tracking-widest">Historical Replay</span>
                 </div>
               )}

               {/* CHAOS HEATMAP */}
               <AnimatePresence>
                 {(activeScenario !== 'none' || isChaosMode) && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isChaosMode ? 0.4 : 0.2 }}
                     exit={{ opacity: 0 }}
                     className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
                       isChaosMode ? 'bg-gradient-to-br from-red-600/30 via-magenta/20 to-red-600/30 animate-pulse' :
                       activeScenario === 'accident' ? 'bg-gradient-to-br from-magenta via-transparent to-magenta' :
                       activeScenario === 'rain' ? 'bg-cyan/20' : 'bg-yellow-500/10'
                     }`}
                   />
                 )}
               </AnimatePresence>

               {/* TACTICAL MAP HUD */}
               <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 h-12 glass-card flex items-center justify-center text-cyan border-cyan/20 neon-glow-cyan bg-slate-900/60 pointer-events-auto">
                           <MapIcon size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                           <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Operational Area</p>
                           <p className="text-sm md:text-xl font-black text-white font-mono tracking-tighter uppercase">SECTOR_72 // DYNAMIC_GRID</p>
                        </div>
                     </div>
                     <div className="text-right text-slate-500 font-mono text-[8px] md:text-[10px] tracking-widest hidden xs:block">
                        MAP_ID: LOGI_V3<br />
                        COORDS: 42.3601 N, 71.0589 W
                     </div>
                  </div>

                  <div className="flex items-end justify-between">
                     <div className="glass-card bg-slate-900/80 p-4 md:p-5 max-w-[240px] md:max-w-sm border-white/10 pointer-events-auto backdrop-blur-md relative overflow-hidden">
                        {activeAnomaly && (
                          <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            className="absolute inset-0 bg-magenta/10 border-l-4 border-magenta flex flex-col justify-center p-4 md:p-5"
                          >
                             <div className="flex items-center gap-2 mb-1">
                                <AlertCircle size={12} className="text-magenta md:w-3.5 md:h-3.5" />
                                <span className="text-[8px] md:text-[9px] font-black text-magenta uppercase tracking-widest">Active Anomaly</span>
                             </div>
                             <p className="text-[10px] md:text-[11px] font-bold text-white mb-2 md:mb-3 uppercase tracking-tighter">{activeAnomaly.name}</p>
                             <button
                              onClick={handleFixAnomaly}
                              className="w-fit px-3 py-1 md:px-4 md:py-1.5 bg-magenta text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-magenta transition-colors rounded"
                             >
                                Initiate Fix
                             </button>
                          </motion.div>
                        )}

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] md:text-[9px] font-black text-cyan uppercase tracking-widest flex items-center gap-2">
                             <Activity size={10} className="md:w-3 md:h-3" /> AI Decision Engine
                          </span>
                          <button
                            onClick={() => {
                              setIsThinking(true);
                              setTimeout(() => {
                                setIsThinking(false);
                                showNotify("Area Re-Scanned: No immediate threats", "success");
                                addLog("MANUAL_SCAN: Surface level clearing complete.", "info");
                              }, 1500);
                            }}
                            className="text-[7px] md:text-[8px] font-black text-slate-500 hover:text-white uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 md:px-2 md:py-1 rounded transition-colors"
                          >
                            Re-Scan
                          </button>
                        </div>
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 italic leading-relaxed">
                           "{decisionReason}"
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Asset Status</p>
                        <p className="text-[10px] md:text-xs font-black text-acid tracking-widest flex items-center gap-2 justify-end uppercase">
                           LM-204: SYNCED <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-acid rounded-full animate-ping" />
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* PREDICTIVE TELEMETRY (4x2) */}
            <section className="col-span-1 md:col-span-4 row-span-1 md:row-span-2 glass-card p-4 md:p-6 flex flex-col border-white/5 hover:border-white/10 transition-all bg-slate-900/20 h-[250px] md:h-auto">
               <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                    <TrendingUp size={12} className="text-cyan md:w-3.5 md:h-3.5" />
                    Predictive Pulse
                  </h3>
                  <span className="text-[7px] md:text-[8px] font-mono text-slate-600">RT_OPTIMIZATION</span>
               </div>
               <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#00f2ff" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', border: 'none', borderRadius: '4px', fontSize: '10px' }} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </section>

            {/* NODE HISTORY (4x2) */}
            <section className="col-span-1 md:col-span-4 row-span-1 md:row-span-2 glass-card flex flex-col border-white/5 bg-slate-900/20 overflow-hidden h-[300px] md:h-auto">
               <div className="flex border-b border-white/5 bg-white/5">
                  <button
                    onClick={() => setActiveNodeTab('logs')}
                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
                      activeNodeTab === 'logs' ? 'border-cyan text-cyan bg-cyan/5' : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Neural Logs
                  </button>
                  <button
                    onClick={() => setActiveNodeTab('reports')}
                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
                      activeNodeTab === 'reports' ? 'border-acid text-acid bg-acid/5' : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Reports ({reports.length})
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {activeNodeTab === 'logs' ? (
                    history.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleReplay(item)}
                        className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-transparent hover:border-cyan/30 hover:bg-white/10 transition-all cursor-pointer group/item"
                      >
                         <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover/item:text-cyan group-hover/item:bg-cyan/10 transition-colors">
                            <History size={14} />
                         </div>
                         <div className="flex-1">
                            <p className="text-[9px] font-black text-white font-mono uppercase truncate">{item.scenario === 'chaos' ? 'CRITICAL_CHAOS' : `VEC_${item.scenario}`}</p>
                            <p className="text-[8px] font-bold text-slate-600 uppercase">{item.timestamp} | {item.status}</p>
                         </div>
                         <div className="text-[10px] font-black text-cyan opacity-40 group-hover/item:opacity-100">{item.score}%</div>
                      </div>
                    ))
                  ) : (
                    reports.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full opacity-20 py-8">
                        <Database size={32} />
                        <p className="text-[10px] font-black uppercase tracking-widest mt-2">No Reports</p>
                      </div>
                    ) : (
                      reports.map((report) => (
                        <div
                          key={report.id}
                          className="glass-card p-3 border-white/5 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer"
                          onClick={() => openStoredReport(report)}
                        >
                           <div className="flex justify-between items-start mb-1">
                              <span className="text-[9px] font-black text-white font-mono uppercase truncate max-w-[100px]">
                                 {report.sector}
                              </span>
                              <span className="text-[8px] font-mono text-slate-500">{report.formattedTime}</span>
                           </div>
                           <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 uppercase">
                              <span>Eff: <span className="text-acid">{report.efficiency}%</span></span>
                              <div className="flex items-center gap-1 text-acid group-hover:underline">
                                 <Eye size={10} /> VIEW
                              </div>
                           </div>
                        </div>
                      ))
                    )
                  )}
               </div>
            </section>

            {/* KERNEL OUTPUT TERMINAL (12x2) */}
            <section className="col-span-1 md:col-span-12 row-span-1 md:row-span-2 glass-card flex flex-col border-white/5 bg-black/40 overflow-hidden relative h-[300px] md:h-auto">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <TerminalIcon size={60} className="md:w-20 md:h-20" />
               </div>
               <div className="px-4 md:px-6 py-2 md:py-3 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2 md:gap-3">
                     <TerminalIcon size={12} className="text-cyan md:w-3.5 md:h-3.5" />
                     <span className="text-[8px] md:text-[9px] font-black text-white uppercase tracking-[0.4em]">Kernel_Output</span>
                  </div>
                  <div className="flex gap-1.5 md:gap-2">
                     <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-red-500/50" />
                     <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-500/50" />
                     <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-acid/50" />
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-[10px] md:text-[11px] leading-relaxed custom-scrollbar selection:bg-cyan/30">
                  {logs.map((log, i) => (
                    <div key={i} className={`mb-1.5 ${
                      log.includes('WARNING') || log.includes('CHAOS') ? 'text-magenta' :
                      log.includes('SUCCESS') || log.includes('OPTIMIZED') ? 'text-acid' :
                      log.includes('AI') ? 'text-cyan' : 'text-slate-500'
                    }`}>
                      <span className="opacity-30 mr-3 text-slate-600">[{logs.length - i}]</span>
                      <span className="opacity-50 mr-2">&gt;</span>
                      {log}
                    </div>
                  ))}
                  <div className="animate-pulse text-cyan font-black mt-2 inline-block">_</div>
               </div>
               {/* Terminal HUD info overlay */}
               <div className="absolute bottom-4 right-6 text-[8px] font-mono text-slate-700 uppercase tracking-widest pointer-events-none">
                  Active_Processes: 1,482 // Memory: 2.4GB // Encryption: AES-256
               </div>
            </section>
         </div>
      </main>

      {/* PORTALED MODALS (Moved to root for Z-index & Transform stability) */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md no-print"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass-card bg-slate-900/95 border-white/10 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <Sliders className="text-cyan" size={20} />
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white">System Configuration</h2>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 md:mb-4 block">Core Automation</label>
                    <div className="space-y-2 md:space-y-3">
                      <button
                        onClick={() => setSettings(s => ({...s, autoOptimize: !s.autoOptimize}))}
                        className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all ${settings.autoOptimize ? 'bg-cyan/10 border-cyan/30 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
                      >
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Auto-Optimization</span>
                        <div className={`w-8 md:w-10 h-4 md:h-5 rounded-full relative transition-colors ${settings.autoOptimize ? 'bg-cyan' : 'bg-slate-700'}`}>
                          <div className={`absolute top-0.5 md:top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.autoOptimize ? 'left-4.5 md:left-6' : 'left-0.5 md:left-1'}`} />
                        </div>
                      </button>
                      <button
                         onClick={() => setSettings(s => ({...s, darkFiber: !s.darkFiber}))}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${settings.darkFiber ? 'bg-magenta/10 border-magenta/30 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Dark Fiber Mesh</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.darkFiber ? 'bg-magenta' : 'bg-slate-700'}`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.darkFiber ? 'left-6' : 'left-1'}`} />
                        </div>
                      </button>
                      <button
                         onClick={() => setSettings(s => ({...s, globalMode: !s.globalMode}))}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${settings.globalMode ? 'bg-acid/10 border-acid/30 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Global Ops View</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.globalMode ? 'bg-acid' : 'bg-slate-700'}`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.globalMode ? 'left-6' : 'left-1'}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 block">Security & Performance</label>
                    <div className="space-y-4">
                      <button
                        onClick={() => setSettings(s => ({...s, soundEnabled: !s.soundEnabled}))}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${settings.soundEnabled ? 'bg-cyan/10 border-cyan/30 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Auditory Alerts</span>
                        <Bell size={14} className={settings.soundEnabled ? 'text-cyan' : 'text-slate-700'} />
                      </button>
                      <div className="p-4 glass-card bg-white/5 border-white/5">
                         <div className="flex justify-between mb-2">
                           <span className="text-[10px] font-bold uppercase text-slate-400">Neural Precision</span>
                           <span className="text-[10px] font-mono text-cyan">{settings.neuralPrecision}%</span>
                         </div>
                         <input
                          type="range"
                          min="50" max="100"
                          value={settings.neuralPrecision}
                          onChange={(e) => setSettings(s => ({...s, neuralPrecision: parseInt(e.target.value)}))}
                          className="w-full accent-cyan h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                         />
                      </div>
                      <div className="flex gap-2">
                        {['standard', 'aggressive', 'paranoid'].map(level => (
                          <button
                            key={level}
                            onClick={() => setSettings(s => ({...s, threatLevel: level}))}
                            className={`flex-1 p-3 rounded-lg border text-[8px] font-black uppercase tracking-tighter transition-all ${settings.threatLevel === level ? 'bg-acid/10 border-acid/50 text-acid' : 'bg-white/5 border-white/5 text-slate-600'}`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-4">
                <button
                  onClick={() => {
                    showNotify("Settings Synchronized", "success");
                    setIsSettingsOpen(false);
                  }}
                  className="px-8 py-3 bg-cyan text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                >
                  Apply Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdvancedReport && advancedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto print-report-modal"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              ref={reportRef}
              className="w-full max-w-2xl glass-card border-cyan/30 p-8 relative bg-slate-950 print-area my-auto shadow-[0_0_60px_rgba(0,242,255,0.1)]"
            >
                {/* EXTERNAL CLOSE BUTTON */}
                <button
                  onClick={() => setShowAdvancedReport(false)}
                  className="absolute -top-4 -right-4 z-[2001] p-2 bg-slate-900 border border-cyan/30 text-cyan hover:text-white rounded-full transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:scale-110 no-print"
                  title="Close Report"
                >
                  <X size={20} />
                </button>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan to-transparent" />

                <div className="flex justify-between items-start mb-10">
                  <div>
                      <p className="text-cyan font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Tactical Intelligence // Classified</p>
                      <h2 className="text-4xl font-black text-white italic tracking-tighter">MISSION_REPORT_ADV</h2>
                      <p className="text-[8px] font-mono text-slate-500 mt-1 uppercase">LogiMind Tactical Systems v4.0.2</p>
                  </div>
                  <div className="text-right">
                      <div className="p-2 border border-cyan/20 rounded bg-cyan/5 inline-block mb-2">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-1">
                              <div className="w-4 h-4 bg-cyan animate-pulse" />
                              <div className="w-4 h-4 bg-cyan/20" />
                              <div className="w-4 h-4 bg-cyan/20" />
                              <div className="w-4 h-4 bg-cyan" />
                            </div>
                        </div>
                      </div>
                      <p className="text-[8px] font-mono text-cyan uppercase tracking-widest">Auth_Token: Verified</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10 p-1">
                  <div className="space-y-6">
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Sector_Index</p>
                        <p className="text-xl font-mono font-bold text-white">{advancedReport.sector}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Efficiency_Rating</p>
                        <p className="text-xl font-mono font-bold text-acid">{advancedReport.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Active_Threats</p>
                        <p className="text-xl font-mono font-bold text-magenta">{advancedReport.threats} Detected</p>
                      </div>
                  </div>
                  <div className="space-y-6">
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Timestamp</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">{advancedReport.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Tracked_Assets</p>
                        <p className="text-xl font-mono font-bold text-cyan">{advancedReport.assets} Units</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Protocol_Rec</p>
                        <p className="text-[10px] font-mono font-bold text-white bg-white/5 p-2 border-l-2 border-cyan uppercase">{advancedReport.recommendation}</p>
                      </div>
                  </div>
                </div>

                {/* TACTICAL SNAPSHOT VISUAL */}
                <div className="mb-8">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Tactical_Snapshot_Alpha</p>
                  <div className="h-40 bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 cyber-grid" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {detectedPoints.map(p => (
                              <div
                                key={p.id}
                                className={`absolute w-3 h-3 rounded-full border ${p.type === 'hazard' ? 'border-magenta bg-magenta/20' : 'border-cyan bg-cyan/20'}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                              >
                                <div className={`w-0.5 h-0.5 m-auto inset-0 absolute rounded-full ${p.type === 'hazard' ? 'bg-magenta' : 'bg-cyan'}`} />
                              </div>
                            ))}
                            <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/5" />
                            <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-[6px] font-mono text-slate-500">GRATICULE_OVERLAY_ACTIVE // NO_SIGNAL_INTERFERENCE</div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-cyan" />
                        <div className="w-1 h-1 bg-cyan" />
                        <div className="w-1 h-1 bg-cyan/30" />
                      </div>
                  </div>
                </div>

                <div className="p-6 bg-cyan/5 border border-cyan/10 rounded-xl mb-8">
                  <h4 className="text-[10px] font-black text-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
                      <MapIcon size={14} /> Coordinate Tracking Log
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                      {advancedReport.points?.slice(0, 4).map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-1">
                          <span className={p.type === 'hazard' ? 'text-magenta' : 'text-cyan'}>{p.label}</span>
                          <span className="text-slate-500">{p.lat}, {p.lng}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-900 border border-white/5 rounded-xl mb-8">
                  <h4 className="text-[10px] font-black text-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Cpu size={14} /> AI Synthesis
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                      "Area sweep confirms {advancedReport.threats} high-friction nodes. Recommendation is to prioritize {advancedReport.recommendation === 'MAINTAIN_NOMINAL_FLOW' ? 'flow stability' : 'dynamic rerouting'} to maintain efficiency above 90% threshold. Digital Twin assets synchronized at {advancedReport.efficiency}% precision."
                  </p>
                </div>

                <div className="flex gap-4 no-print" data-html2canvas-ignore="true">
                  <button
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="relative flex-1 py-4 bg-cyan text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50"
                  >
                      {isExporting && (
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: `${exportProgress - 100}%` }}
                          className="absolute inset-0 bg-white/30"
                        />
                      )}
                      <Printer size={16} /> {isExporting ? `Preparing... ${exportProgress}%` : 'Execute Tactical Print'}
                  </button>
                  <button
                    onClick={() => setShowAdvancedReport(false)}
                    disabled={isExporting}
                    className="px-8 py-4 border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-white/5 transition-all disabled:opacity-50"
                  >
                      Dismiss
                  </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
