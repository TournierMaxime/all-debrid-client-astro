import { useState } from "react"
import { PUBLIC_MOTRIX } from "astro:env/client"

import { AlertMessage } from "@/components/Alert"
import { Button as BtnShadcn } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { handleDownload } from "@/feature/media/components/Provider"

export default function DirectDownload() {
  const [showForm, setShowForm] = useState(false)
  const [link, setLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!link.trim()) return

    handleDownload(link)
  }

  return (
    <div className="mb-4 border border-(--ads-border) rounded p-4">
      <AlertMessage
        title="Information"
        description="Deux moyens de téléchargement s'offrent à vous : Motrix et Download Station. Si vous choisissez Motrix, vous serez redirigé directement vers cette plateforme et vous pourrez copier, coller votre lien de téléchargement. En revanche, si vous choisissez Download Station, vous pourrez directement coller votre lien dans la zone de
         texte et ainsi télécharger votre fichier."
      />
      <BtnShadcn className="bg-(--ads-motrix) rounded p-2 mr-4 cursor-pointer">
        <a
          target="_blank"
          className="text-(--ads-text-default)"
          href={PUBLIC_MOTRIX}
        >
          Motrix
        </a>
      </BtnShadcn>
      <BtnShadcn
        className="bg-(--ads-ds-get) rounded p-2 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        <a target="_blank" className="text-(--ads-text-default)">
          Download Station
        </a>
      </BtnShadcn>
      {!!showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex items-start gap-2 mt-4 flex-col"
        >
          <Textarea
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Coller un lien de téléchargement"
            className="bg-(--ads-bg-default) border border-(--ads-border-default) rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--ads-primary-default)"
          />

          <BtnShadcn
            type="submit"
            disabled={!link.trim()}
            className="bg-(--ads-btn-default) rounded p-2 cursor-pointer"
          >
            Confirmer
          </BtnShadcn>
        </form>
      )}
    </div>
  )
}
