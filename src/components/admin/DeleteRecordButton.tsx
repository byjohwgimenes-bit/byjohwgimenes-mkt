import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export function DeleteRecordButton({ label, description, onDelete, disabled = false }: { label: string; description: string; onDelete: () => Promise<unknown>; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  return <AlertDialog open={open} onOpenChange={value => { if (!busy) setOpen(value); }}>
    <AlertDialogTrigger asChild><Button size="sm" variant="destructive" disabled={disabled || busy}>{label}</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader><AlertDialogTitle>{label}?</AlertDialogTitle><AlertDialogDescription>{description} Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={busy}>Cancelar</AlertDialogCancel>
        <AlertDialogAction disabled={busy} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={async event => {
          event.preventDefault(); setBusy(true);
          try { await onDelete(); setOpen(false); } catch { /* Mutation displays the error and allows retry. */ } finally { setBusy(false); }
        }}>{busy ? "Excluindo…" : "Confirmar exclusão"}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
