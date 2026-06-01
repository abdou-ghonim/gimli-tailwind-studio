// Chrome global - permissive declaration for Chrome Extension runtime
declare const chrome: {
  runtime: {
    sendMessage(message: unknown, callback?: (response: unknown) => void): void
    onMessage: {
      addListener(callback: (message: unknown, sender: unknown, sendResponse: (response?: unknown) => void) => boolean | void): void
      removeListener(callback: (message: unknown, sender: unknown, sendResponse: (response?: unknown) => void) => boolean | void): void
    }
    lastError?: string
  }
  storage: {
    sync: {
      get(keys: unknown, callback?: (items: Record<string, unknown>) => void): void
      set(items: Record<string, unknown>, callback?: () => void): void
      remove(keys: string | string[], callback?: () => void): void
      clear(callback?: () => void): void
    }
    local: {
      get(keys: unknown, callback?: (items: Record<string, unknown>) => void): void
      set(items: Record<string, unknown>, callback?: () => void): void
    }
    onChanged: {
      addListener(callback: (changes: Record<string, { oldValue?: unknown; newValue?: unknown }>) => void): void
      removeListener(callback: (changes: Record<string, { oldValue?: unknown; newValue?: unknown }>) => void): void
    }
  }
  tabs: {
    query(query: { active?: boolean; currentWindow?: boolean }, callback: (tabs: { id?: number; url?: string }[]) => void): void
    sendMessage(tabId: number, message: unknown, callback?: (response?: unknown) => void): void
    onActivated: {
      addListener(callback: (activeInfo: { tabId: number; windowId: number }) => void): void
    }
  }
  scripting: {
    executeScript(options: { target: { tabId: number }; files: string[] }): Promise<{ frameId: number; result?: unknown }[]>
    insertCSS(options: { target: { tabId: number }; files: string[] }): Promise<void>
  }
  commands: {
    onCommand: {
      addListener(callback: (command: string) => void): void
    }
  }
}
