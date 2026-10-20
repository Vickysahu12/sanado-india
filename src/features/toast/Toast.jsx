import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

// Small confirmation toast ("Added to bag"). One at a time, auto-dismisses,
// timer pauses while hovered. Sits above the mobile tab bar.

const ToastContext = createContext(null)
const DURATION = 3200

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const dismiss = useCallback(() => setToast(null), [])
  const show = useCallback((t) => setToast({ ...t, key: Date.now() }), [])

  const startTimer = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(dismiss, DURATION)
  }, [dismiss])

  useEffect(() => {
    if (toast) startTimer()
    return () => clearTimeout(timer.current)
  }, [toast, startTimer])

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 lg:bottom-6"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.key}
              role="status"
              onMouseEnter={() => clearTimeout(timer.current)}
              onMouseLeave={startTimer}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.18 }}
              className="pointer-events-auto flex w-full max-w-[420px] items-center gap-3 rounded-[6px] bg-ink p-2.5 pr-3 text-bone shadow-lift"
            >
              {toast.image && <Img id={toast.image} alt="" sizes="48px" className="h-14 w-11 shrink-0 rounded-none" />}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[14px] font-semibold"><Icon name="check-circle" size={17} weight="fill" className="text-bone" />{toast.title}</p>
                {toast.body && <p className="truncate text-[13px] text-bone/70">{toast.body}</p>}
              </div>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action.onClick()
                    dismiss()
                  }}
                  className="press shrink-0 rounded-[6px] bg-ink px-4 py-2 text-[13px] font-semibold text-paper"
                >
                  {toast.action.label}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
