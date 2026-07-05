import React from "react";
import { 
  LayoutDashboard, PlaySquare, FolderKanban, 
  Palette, BarChart3, Rocket, Settings, HelpCircle, ChevronRight, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
  onOpenPanel: (panel: any) => void;
}

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, onOpenPanel }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generate', label: 'Generate Portfolio', icon: PlaySquare },
    { id: 'portfolios', label: 'My Portfolios', icon: FolderKanban },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'deployments', label: 'Deployments', icon: Rocket },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const renderItem = (item: any, isPanel = false, index: number = 0) => {
    const isActive = activeTab === item.id && !isPanel;
    return (
      <motion.button
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
        whileHover={{ x: isCollapsed ? 0 : 4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => isPanel ? onOpenPanel(item.id) : setActiveTab(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative group
          ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
        title={isCollapsed ? item.label : undefined}
      >
        {isActive && (
          <motion.div
            layoutId="sidebarActiveIndicator"
            className="absolute inset-0 bg-primary/10 rounded-xl shadow-[0_0_20px_rgba(212,165,116,0.15)] border border-primary/20"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="z-10 shrink-0"
        >
          <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
        </motion.div>
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium text-sm z-10 whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  };

  return (
    <div 
      className={`h-[calc(100vh-72px)] border-r border-border-subtle bg-white transition-all duration-300 flex flex-col z-40
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="p-3 flex justify-end">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1 no-scrollbar">
        {menuItems.map((item, idx) => renderItem(item, false, idx))}
      </div>

      <div className="px-3 py-4 border-t border-border-subtle flex flex-col gap-1">
        {bottomItems.map((item, idx) => renderItem(item, true, menuItems.length + idx))}
      </div>
    </div>
  );
}
