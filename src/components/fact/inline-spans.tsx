import type { InlineSpan } from '@/lib/fact-model'

interface InlineSpansProps {
  spans: readonly InlineSpan[]
}

/** 構造化されたインライン文字列を安全な React 要素として描画する。 */
export function InlineSpans({ spans }: InlineSpansProps) {
  return (
    <>
      {spans.map((span, index) =>
        span.bold ? (
          <strong key={`${span.text}-${index}`}>{span.text}</strong>
        ) : (
          <span key={`${span.text}-${index}`}>{span.text}</span>
        ),
      )}
    </>
  )
}
