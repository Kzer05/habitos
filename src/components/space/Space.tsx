interface SpaceProps {
    width?: number | string
    height?: number | string
}

export default function Space({ width = 0, height = 0 }: SpaceProps) {
    return (
        <div style={{ width, height }} />
    )
}
