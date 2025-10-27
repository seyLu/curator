import { Anchor } from "@mantine/core";

export function Footer() {
    return (
        <div className="mx-auto mt-1">
            <div className="flex gap-1">
                Made with ♥️ by
                <Anchor
                    href="https://github.com/seyLu/curator"
                    target="_blank"
                    underline="always"
                >
                    seyLu
                </Anchor>
            </div>
        </div>
    );
}
