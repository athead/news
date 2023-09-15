import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback: boolean;
    rate?: number;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { className, rate = 0, hasFeedback, feedbackTitle, onAccept, onCancel, title } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const { t } = useTranslation();

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input data-testid="RatingCard.Input" placeholder={t('feedback')} onChange={setFeedback} />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        placeholder={t('feedback')}
                        onChange={setFeedback}
                    />
                </>
            }
        />
    );
    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text title={starsCount ? t('rated') : title} />}
                    off={<TextDeprecated title={starsCount ? t('rated') : title} />}
                />

                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack gap="16">
                                    <Button data-testid="RatingCard.Close" variant="outline" onClick={acceptHandler}>
                                        {t('send')}
                                    </Button>
                                    <Button data-testid="RatingCard.Send" variant="outline" onClick={cancelHandler}>
                                        {t('cancel')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack gap="16">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={acceptHandler}
                                    >
                                        {t('send')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={cancelHandler}
                                    >
                                        {t('cancel')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Button variant="outline" onClick={acceptHandler} fullWidth>
                                    {t('send')}
                                </Button>
                            }
                            off={
                                <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={acceptHandler} fullWidth>
                                    {t('send')}
                                </ButtonDeprecated>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    padding="24"
                    border="middle"
                    className={classNames('', {}, [className])}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated className={classNames('', {}, [className])} max data-testid="RatingCard">
                    {content}
                </CardDeprecated>
            }
        />
    );
});
