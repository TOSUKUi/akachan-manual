import type { TableBlock } from '@/lib/fact-model'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DataTable({ block }: { block: TableBlock }) {
  return (
    <div className="my-3 overflow-x-auto rounded-lg border border-border">
      <Table className="min-w-[520px]">
        <TableHeader>
          <TableRow>
            {block.headers.map((header, index) => (
              <TableHead key={`${header}-${index}`}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {block.rows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} className={rowIndex % 2 === 0 ? 'bg-muted/20' : undefined}>
              {block.headers.map((_, cellIndex) => (
                <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{row[cellIndex] ?? ''}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
