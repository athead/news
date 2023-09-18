import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Drawer } from '@/shared/ui/Drawer';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

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
        <>
            <Text title={feedbackTitle} />
            <Input data-testid="RatingCard.Input" placeholder={t('feedback')} onChange={setFeedback} />
        </>
    );
    const content = (
        <>
            <VStack align="center" gap="8" max>
                <Text title={starsCount ? t('rated') : title} />

                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <HStack gap="16">
                            <Button data-testid="RatingCard.Close" variant="outline" onClick={acceptHandler}>
                                {t('send')}
                            </Button>
                            <Button data-testid="RatingCard.Send" variant="outline" onClick={cancelHandler}>
                                {t('cancel')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                    <VStack gap="32">
                        {modalContent}
                        <Button variant="outline" onClick={acceptHandler} fullWidth>
                            {t('send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );
    return (
        <Card padding="24" border="middle" className={classNames('', {}, [className])} max
data-testid="RatingCard">
            {content}
        </Card>
    );
});
