import { useState } from "react"
import { actions } from "astro:actions"

import { Button as BtnShadcn } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface RenameFileProps {
  file: string
  realPath: string
  extension: string
}

interface MoveFileProps {
  currentSection?: string
}

export const RenameFile = ({ file, extension, realPath }: RenameFileProps) => {
  const [name, setName] = useState(file)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file || !name) return

    await actions.renameFile({
      path: realPath,
      name: `${name}.${extension}`,
    })

    window.location.href = "/libraries"
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field orientation="horizontal">
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <BtnShadcn className="cursor-pointer" type="submit">
          Renommer
        </BtnShadcn>
      </Field>
    </form>
  )
}

export const MoveFile = ({ currentSection }: MoveFileProps) => {
  const SECTIONS = [
    { value: "/video/Films", label: "Films" },
    { value: "/homes/Hoggy/Films", label: "Films Privés" },
  ]

  return (
    <form method="post" className="flex gap-2 mt-1">
      <input type="hidden" name="dest_folder_path" value="move" />
      <select className="bg-(--ads-bg-default) border border-[--ads-border-dropdown] p-1 rounded text-sm flex-1">
        {SECTIONS.map((s, index: number) => (
          <option
            key={index}
            value={s.value}
            selected={s.value === currentSection}
          >
            {s.label}
          </option>
        ))}
      </select>
      <BtnShadcn className="cursor-pointer" type="submit">
        Déplacer
      </BtnShadcn>
    </form>
  )
}
