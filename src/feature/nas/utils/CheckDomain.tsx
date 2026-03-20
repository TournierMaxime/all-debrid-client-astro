import { useState } from "react"
import { actions } from "astro:actions"

import { Button as BtnShadcn } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function CheckDomain({ expiresAt }: { expiresAt: number }) {
  const [loading, setLoading] = useState(false)

  const handleCheckDomain = async () => {
    setLoading(true)
    try {
      await actions.checkDomainName()
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BtnShadcn
      disabled={expiresAt > Date.now()}
      className="cursor-pointer"
      onClick={handleCheckDomain}
    >
      {loading ? <Spinner /> : "Vérifier"}
    </BtnShadcn>
  )
}
