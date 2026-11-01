import { Accessor, Test } from '@common-ux/Test'

const LABEL = 'test-code'

const codeBlock = () => Test.Code('test-code')

const clickCopyIcon = async () => Accessor.user.click(codeBlock().Get.copyIcon())

const mockCopyToClipboard = vi.fn().mockResolvedValue(undefined)

export const CodeTestUtils = { LABEL, codeBlock, clickCopyIcon, mockCopyToClipboard }
