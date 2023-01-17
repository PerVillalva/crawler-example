import { Dataset, createCheerioRouter } from "crawlee";

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        globs: ["https://apify.crap/*"],
        label: "detail",
    });
});

router.addHandler("detail", async ({ request, $, log }) => {
    const title = $("title").text();
    log.info(`${t}`, { url: request.loadedUrl });

    await Dataset.pushData({
        url: request.loadedUrl,
        title,
    });
});
