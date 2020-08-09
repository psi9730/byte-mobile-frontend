import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
} from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { Box } from "components/Common";
import { Toast } from "/components/Toast";
import { Deck } from "/containers/Home/containers";
import useLocalStorage from "hooks/useLocalStorage";
import { getArticles } from "../services/Article";
import { postEvent } from "../services/Event";
const Container = styled(Box)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    /* position: fixed; */
    overscroll-behavior: contain;
`;
const DeckContainer = styled(Box)`
    /* margin: 0 auto; */
    max-width: ${(props) => props.theme.breakpoints[2]};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;
const DeckInnerContainer = styled(Box)`
    /* margin: 0 auto; */
    ${(props) => css`
        @media ${props.theme.device.mobileS} {
            width: calc(100% - 70px);
        }
        @media ${props.theme.device.mobileL} {
            width: calc(100% - 100px);
        }
        @media ${props.theme.device.tablet} {
            width: calc(100% - 350px);
        }
    `}

    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;
const debounce = (fn, ms) => {
    let timer;
    return (_) => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
            timer = null;
            fn.apply(this, {});
        }, ms);
    };
};
const useForceUpdate = () => useState()[1];

const Home = () => {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth != dimensions.width) {
                window.location.reload();
            }
        }, 1000);
        window.addEventListener("resize", debouncedHandleResize);

        return (_) => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

    const onClickToast = () => {
        history.push("/about");
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([]);
    const [deckIndex, setDeckIndex] = useState(0);
    const [likes, setLikes] = useLocalStorage("likes", []);

    const offset = useRef(0);
    const limit = 8;
    useEffect(() => {
        if (offset.current + limit - deckIndex < limit / 2) {
            loadMoreData();
        }
    }, [deckIndex]);
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await getArticles({
                pagination: {
                    offset: offset.current,
                    limit: limit,
                },
                sort: { field: "created_at", order: "desc" },
            });
            Promise.all(
                fetchData.map((data) =>
                    postEvent({
                        event_name: "view_card_full",
                        params: { article_id: data.id },
                    })
                )
            );
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    });
    const loadMoreData = useCallback(async () => {
        if (datas.length > 0) {
            offset.current = offset.current + limit;
            const data = await loadData({
                limit: limit,
            });
            data.length > 0 && setDatas([...datas, ...data]);
        }
    }, [datas, loadData]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await loadData();
            result && result.length > 0 && setDatas(result);
        };
        fetchData();
        postEvent({ event_name: "visit_page_home" });
    }, []);

    return datas.length > 0 ? (
        <Container pt={["40px", "60px"]}>
            <DeckContainer width="100%" height="100%" mt={["32px", "48px"]}>
                <DeckInnerContainer>
                    <Deck
                        likes={likes}
                        setLikes={setLikes}
                        datas={datas}
                        deckIndex={deckIndex}
                        setDeckIndex={setDeckIndex}
                    />
                </DeckInnerContainer>
            </DeckContainer>
            <Toast
                onClick={() => onClickToast()}
                data={{ image_url: "toast.png" }}
                width={["45px", "45px", "60px"]}
                height={["45px", "45px", "60px"]}
                boxShadow="5px 4px 3px 0px rgba(88, 88, 88, 0.425)"
            ></Toast>
        </Container>
    ) : null;
};

export default Home;
