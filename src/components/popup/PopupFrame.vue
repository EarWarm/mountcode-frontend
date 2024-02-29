<template>
    <transition name="popup">
        <div v-if="isActive" class="popup" v-on:dblclick="closePopup">
            <div class="popup__container" @dblclick.stop>
                <div class="popup__header">
                    <slot name="header"></slot>
                    <div class="popup__close" v-on:click="closePopup"><i class="icon icon-close"></i></div>
                </div>
                <div class="popup__body">
                    <slot name="body"></slot>
                </div>
                <div class="popup__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "PopupFrame",
    props: {
        onClose: Function,
        isActive: Boolean
    },
    methods: {
        closePopup() {
            if (this.onClose !== undefined) {
                this.onClose();
            }
        }
    }
}
</script>