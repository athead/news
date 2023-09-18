import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={className}>
            <VStack gap="16">
                <Text title={t('user_settings')} />
            </VStack>
        </Page>
    );
});

export default SettingsPage;
