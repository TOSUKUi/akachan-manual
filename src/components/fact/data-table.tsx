import type { TableBlock } from '@/lib/fact-model'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

/**
 * マークダウンのテーブル表示。
 * モバイル（<sm）: 各行を縦カードで表示（横スクロール不要・列の意味が残る）。
 * デスクトップ（sm+）: 従来の横テーブル。
 */
export default function DataTable({ block }: { block: TableBlock }) {
  const headers = block.headers
  return (
    <div className="my-3">
      {/* デスクトップ: 横テーブル */}
      <div className="hidden overflow-x-auto rounded-lg border border-border sm:block">
        <Table className="min-w-[520px]">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={`${header}-${index}`}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                className={rowIndex % 2 === 0 ? 'bg-muted/20' : undefined}
              >
                {headers.map((_, cellIndex) => (
                  <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{row[cellIndex] ?? ''}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* モバイル: カード表示（列見出し + 値） */}
      <div className="space-y-3 sm:hidden">
        {block.rows.map((row, rowIndex) => (
          <div key={`card-${rowIndex}`} className="rounded-lg border border-border bg-card">
            <dl className="divide-y divide-border/60">
              {headers.map((header, cellIndex) => (
                <div key={`cell-${rowIndex}-${cellIndex}`} className="px-3 py-2">
                  <dt className="text-xs font-bold text-muted-foreground">{header}</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed">{row[cellIndex] ?? ''}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
