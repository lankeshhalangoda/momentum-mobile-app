import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Design system/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="p-6">
        <p className="font-display text-lg text-fg">Surface</p>
        <p className="font-sans mt-2 text-sm text-fg-muted">
          Default glass, brand tint, or deep emerald hero — light & dark safe.
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { tone: "default" } };
export const Brand: Story = { args: { tone: "brand" } };
export const Dark: Story = { args: { tone: "dark" } };
export const BrandMesh: Story = { args: { tone: "brand", decoration: "mesh" } };
export const DarkContour: Story = { args: { tone: "dark", decoration: "contour" } };
export const SoftHover: Story = { args: { tone: "default", hover: true, hoverSoft: true } };
