import { Anchor } from "@mantine/core";

export function Footer() {
    return (
        <div className="mx-auto mt-1 flex gap-1">
            Made with ♥️ by
            <Anchor href="https://github.com/seylu" target="_blank" underline="always">
                seylu
            </Anchor>
        </div>
    );
}
