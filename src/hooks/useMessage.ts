// @ts-nocheck
// useMessage - chrome.runtime messaging hook
import { useEffect } from 'react'
import type { MessageType } from '../types'

type MessageHandler = (message: MessageType) => void

export function useMessage(handler: MessageHandler) {
  useEffect(() => {
    const listener = (message: unknown) => {
      handler(message as MessageType)
    }
    chrome.runtime.onMessage.addListener(listener)
    return () => chrome.runtime.onMessage.removeListener(listener)
  }, [handler])
}

export function sendMessage(message: MessageType): void {
  chrome.runtime.sendMessage(message)
}

export async function sendToTab(tabId: number, message: MessageType): Promise<unknown> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => resolve(response))
  })
}

export async function getActiveTabId(): Promise<number | null> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]?.id ?? null)
    })
  })
}
