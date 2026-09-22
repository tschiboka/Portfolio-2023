// @ts-nocheck — skill example, outside the tsconfig include.
import { useForm } from 'react-hook-form'
import { Form, Field } from '@common-ux'
import { FeatureDefaults } from './Feature.defaults'
import { FeatureHandlers } from './Feature.handlers'
import { featureResolver } from './Feature.schema'
import { FeatureQueries } from './Feature.queries'
import type { FeatureFormData } from './Feature.types'

export const Feature = () => {
    const { handleSubmit } = useForm<FeatureFormData>({
        defaultValues: FeatureDefaults.form,
        resolver: featureResolver,
    })

    const { mutateAsync } = FeatureQueries.usePostForm()

    return (
        <Form onSubmit={handleSubmit((data) => FeatureHandlers.submit(data, mutateAsync))}>
            <Field name="name" />
            <Field name="userName" />
            <Field name="email" />
            <Field name="password" />
            <Field name="passwordConfirmation" />
            <Field name="category" />
        </Form>
    )
}
