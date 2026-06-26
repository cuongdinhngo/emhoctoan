# DESIGN.md — emhoctoan

> Mọi session refactor UI/UX **phải đọc lại file này trước khi sửa**.
> Token trong `tailwind.config.js` + biến CSS trong `src/index.css` là **nguồn sự thật duy nhất**.
> Cấm hard-code hex/px rải rác trong component.

## Direction
Friendly / encouraging cho học sinh tiểu học (lớp 3–5). Sáng, bo tròn, số to dễ đọc,
phản hồi tích cực. Vui nhưng không trẻ-con-hoá quá đà, không gây mỏi mắt.

**Dials (design-taste-frontend):** `DESIGN_VARIANCE=3` · `MOTION_INTENSITY=5` · `VISUAL_DENSITY=2`.
Layout đối xứng, dễ đoán; motion vừa phải có chủ đích; nhiều khoảng thở, số to.

## Color tokens
| Token | Hex | Dùng cho |
|---|---|---|
| `bg/base` | `#FFFDF7` | nền trang (kem ấm, không chói) |
| `bg/surface` | `#FFFFFF` | thẻ, panel |
| `ink` | `#22303A` | chữ chính |
| `ink/muted` | `#5B6B76` | chữ phụ, mô tả |
| `brand/primary` | `#3B82F6` | hành động chính, nhấn |
| `brand/secondary` | `#F59E0B` | nhấn phụ, huy hiệu |
| `success` | `#22C55E` | đúng (luôn kèm icon ✓ + chữ) |
| `error` | `#EF4444` | sai (luôn kèm icon ✗ + chữ) |
| `accent/violet` | `#A855F7` | huy hiệu/điểm (tiết chế) |
| `accent/teal` | `#14B8A6` | huy hiệu/điểm (tiết chế) |

Quy tắc: success/error dùng tông **mềm** (nền nhạt + viền + chữ đậm), KHÔNG bao giờ chỉ dùng màu —
luôn đi kèm icon (✓ / ✗) và chữ ("Đúng rồi" / "Chưa đúng"). Một accent chủ đạo (primary);
các accent khác chỉ cho định danh lớp/huy hiệu, dùng tiết chế.

## Typography
- **display**: `Baloo 2` — rounded sans vui mắt, hỗ trợ tiếng Việt đầy đủ. Dùng cho đề bài, đáp án, tiêu đề.
- **body**: `Be Vietnam Pro` — sans dễ đọc, hỗ trợ tiếng Việt. Dùng cho nhãn, mô tả, nội dung.
- Cấm font generic: Inter / Roboto / Arial.
- **Type scale**: đề bài rất to (`question` 32–48px), đáp án to (`answer` ~30px),
  tiêu đề (`display-*`), nhãn vừa (`base`/`sm`).
- Số liệu (điểm, thống kê) dùng `tabular-nums` để thẳng cột.

## Spacing & radius
- Spacing scale 4px (token `1`=4px … bổ sung `13`=52px, `15`=60px, `18`=72px).
- Radius lớn, bo tròn: `md 12` / `lg 20` / `xl 28` / `pill 999`.
- Nút bấm to, **touch target ≥ 48px** (`min-h-touch` = 48px) — trẻ con bấm.

## Motion (MOTION_INTENSITY=5 — cho phép nhiều hơn vì trẻ thích feedback)
- Trả lời đúng: pop/bounce nhẹ + confetti tiết chế.
- Chuyển câu / khối mới: slide/fade mượt, stagger nhẹ.
- Hover/active nút: nhấc nhẹ (`-translate-y`) + scale `:active` (spring-feel easing).
- Chỉ animate `transform`/`opacity`; không `transition: all`.
- **Luôn tôn trọng `prefers-reduced-motion`**: mọi animation collapse về tĩnh/instant.

## A11y
- Contrast cao (≥ 4.5:1 cho chữ thường, ≥ 3:1 cho chữ to).
- Đúng/sai = **icon + chữ + màu** (không bao giờ chỉ màu — an toàn cho mù màu).
- Focus ring rõ (`:focus-visible`, outline brand).
- Touch target ≥ 48px cho mọi phần tử bấm được; `touch-action: manipulation`.
- Reduced-motion honored toàn app. Lỗi nhập liệu hiển thị inline, không dùng `alert()`.

## Primitives (Phase 1)
`Button` (to, biến thể primary/secondary/ghost/success) · `Card` · `OptionTile` (đáp án trắc nghiệm) ·
`ProgressPill` · `Badge`. Tất cả đi qua token, không hard-code hex/px.

## Không được sửa (business logic)
`src/utils/problemGenerator/**`, `src/utils/storage.ts`, `src/types/**`,
`src/constants/problemTypes.ts` (và các constants loại bài khác). Chỉ sửa UI layer.
